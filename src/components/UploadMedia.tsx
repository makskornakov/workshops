import { Material } from '@prisma/client';
import { useEffect, useState } from 'react';
import { assignMaterialMediaUrl } from '~/actions/serverActions';
import { useEdgeStore } from '~/lib/edgestore';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

import { UploadDiv } from './upload.styled';
import { useEventListener } from 'usehooks-ts';

export const materialMediaFileInputId = 'material-media-file-input';

function checkDragCoordinates(event: DragEvent) {
  const boundOffset = 0;

  if (event.clientX <= 15 || event.clientY <= boundOffset) {
    return true;
  }
  if (
    event.clientX >= window.innerWidth - boundOffset ||
    event.clientY >= window.innerHeight - boundOffset
  ) {
    return true;
  }
  return false;
}

export default function UploadMediaZone({
  material,
  file,
  setFile,
  uploadingFile,
  setUploadingFile,
  pageDragOver,
  setPageDragOver,
}: {
  material: Material;
  file: File | null;
  setFile: (file: File | null) => void;
  uploadingFile: boolean;
  setUploadingFile: (uploadingFile: boolean) => void;
  pageDragOver: boolean;
  setPageDragOver: (pageDragOver: boolean) => void;
}) {
  const [mediaUrl, setMediaUrl] = useState<string | null>(material.mediaUrl);

  const { edgestore } = useEdgeStore();

  const { isFileDialogActive, isFocused, isDragActive, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },

    maxFiles: 1,
    multiple: false,
    onDrop: (file) => {
      setFile(file[0]);
      setMediaUrl(URL.createObjectURL(file[0]));
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
    // ! resolve later
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // only on dragover start
  useEventListener(
    'dragenter',
    () => {
      // console.log('dragenter');
      setPageDragOver(true);
    },
    undefined,
    true,
  );
  useEventListener(
    'dragend',
    () => {
      // console.log('dragend');
      setPageDragOver(false);
    },
    undefined,
    true,
  );

  useEventListener(
    'dragleave',
    (event) => {
      // console.log('dragleave', event);

      if (checkDragCoordinates(event)) {
        setPageDragOver(false);
      }
    },
    undefined,
    true,
  );
  useEventListener(
    'drop',
    () => {
      // console.log('drop', event);
      setPageDragOver(false);
    },
    undefined,
    true,
  );

  return (
    <section>
      {mediaUrl && (
        <div
          style={{ width: '100%', position: 'relative', height: '150px' }}
          onClick={() => {
            const fileInput = document.getElementById(materialMediaFileInputId) as HTMLInputElement;
            if (fileInput) fileInput.click();
          }}
        >
          <Image
            src={mediaUrl}
            alt="Thumb"
            fill
            style={{ objectFit: 'contain' }}
            sizes="1wv"
            // quality={1}
          />
        </div>
      )}

      {file ? (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <button
            type="reset"
            onClick={(event) => {
              event.preventDefault();
              setMediaUrl(material.mediaUrl);
              setFile(null);
            }}
          >
            Remove
          </button>
          <button
            disabled={uploadingFile}
            type="button"
            onClick={async () => {
              // e.preventDefault();
              if (!material.id) return;
              setUploadingFile(true);
              console.log('file: ', file);
              try {
                const res = await edgestore.mediaFiles.upload({
                  file: file,
                  ...(material.mediaUrl
                    ? {
                        options: {
                          replaceTargetUrl: material.mediaUrl,
                        },
                      }
                    : undefined),
                  input: {
                    materialId: material.id,
                  },
                });

                console.log(res);
                setMediaUrl(res.url);
                setFile(null);
                await assignMaterialMediaUrl(material.id, res.url);
              } catch (error) {
                console.log(error);
              }
              setUploadingFile(false);
            }}
          >
            {uploadingFile ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      ) : (
        <>
          <UploadDiv
            data-is-dragging={pageDragOver}
            data-is-focused={isFocused || isFileDialogActive || isDragActive}
            {...getRootProps({ className: 'dropzone' })}
          >
            <input {...getInputProps()} id={materialMediaFileInputId} />
            <p>
              {pageDragOver
                ? 'Drop your file anywhere'
                : 'Drag and drop your file here, or click to select one'}
            </p>
          </UploadDiv>
          {pageDragOver && (
            <UploadDiv data-is-dragging={false} data-is-focused={false}>
              <p>Drag and drop your file here, or click to select one</p>
            </UploadDiv>
          )}
        </>
      )}
    </section>
  );
}
