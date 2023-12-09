'use client';
import { Material } from '@prisma/client';
import UploadMediaZone from './UploadMedia';
import { useState } from 'react';
import { useEdgeStore } from '~/lib/edgestore';
import { assignMaterialMediaUrl } from '~/actions/saveAvatarUrl';
import { useEventListener } from 'usehooks-ts';
import { MaterialEditorForm } from './Editor.styled';

export default function ClientMaterialForm({
  action,
  material,
}: {
  action: (formData: FormData) => Promise<void>;
  material: Material & { author: { name: string } };
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [saving, setSaving] = useState(false);

  const { edgestore } = useEdgeStore();

  const [pageDragOver, setPageDragOver] = useState(false);

  // only on dragover start
  useEventListener(
    'dragenter',
    () => {
      console.log('dragenter');
      setPageDragOver(true);
    },
    undefined,
    true,
  );
  useEventListener(
    'dragend',
    () => {
      console.log('dragend');
      setPageDragOver(false);
    },
    undefined,
    true,
  );

  function checkCoordinates(event: DragEvent) {
    const boundOffset = 0;
    // return true if coordinates are outside of the window
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

  useEventListener(
    'dragleave',
    (event) => {
      console.log('dragleave', event);

      if (checkCoordinates(event)) {
        setPageDragOver(false);
      }
    },
    undefined,
    true,
  );
  useEventListener(
    'drop',
    (event) => {
      console.log('drop', event);
      setPageDragOver(false);
    },
    undefined,
    true,
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <MaterialEditorForm
        // action={action}
        action={async (formData) => {
          if (file) {
            // console.log('set to true');
            setTimeout(() => {
              // Workaround to prevent batching
              setUploadingFile(true);
            });
            const res = await edgestore.mediaFiles.upload({
              file: file,
              // onProgressChange: (progress) => {
              //   // setProgress(progress);
              // },
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
            setFile(null);
            // console.log('set to false');
            setTimeout(() => {
              // Workaround to prevent batching
              setUploadingFile(false);
            });
            setTimeout(() => {
              setSaving(true);
            });

            await assignMaterialMediaUrl(material.id, res.url);
            setSaving(false);
          }

          await action(formData);
        }}
      >
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={material?.title} />
          </div>
          <div>
            <label>Media Content</label>
            <UploadMediaZone
              material={material}
              file={file}
              setFile={setFile}
              uploadingFile={uploadingFile}
              setUploadingFile={setUploadingFile}
              pageDragOver={pageDragOver}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" defaultValue={material?.description} />
          </div>
          <div
            style={{
              height: '100%',
            }}
          >
            <label htmlFor="Content">Content</label>
            <textarea
              id="content"
              name="content"
              defaultValue={material?.paragraph ?? ''}
              style={{ maxHeight: '20rem', flexGrow: 1 }}
            />
          </div>
        </div>
        <div>
          <p>Author: {material.author.name}</p>
          <button type="submit" disabled={uploadingFile || saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </MaterialEditorForm>
    </div>
  );
}
