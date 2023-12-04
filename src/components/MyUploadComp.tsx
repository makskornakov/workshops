'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { MainUploadLabel, UploadWrapper } from './upload.styled';
import { useEdgeStore } from '~/lib/edgestore';
import { saveAvatarUrl } from '~/actions/saveAvatarUrl';
import { formatFileSize } from '@edgestore/react/utils';
import { maxAvatarSize } from '~/app/api/edgestore/[...edgestore]/config';

export default function MyUploadComp({ currentImage }: { currentImage: string }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userImage, setUserImage] = useState<string>(currentImage);
  const { edgestore } = useEdgeStore();

  const uploadingRef = useRef<HTMLDivElement>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);
  const removeButtonRef = useRef<HTMLButtonElement>(null);

  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedImageURL = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(event.target.files[0]);
      setUserImage(uploadedImageURL);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setUserImage(currentImage);
  };

  return (
    <>
      <UploadWrapper>
        <input
          accept="image/*"
          type="file"
          id="my-upload-input"
          onChange={imageChange}
          style={{ display: 'none' }}
        />
        <MainUploadLabel htmlFor="my-upload-input">
          <Image src={userImage} alt="Thumb" width={100} height={100} />
          <div ref={uploadingRef}>
            <VscLoading />
          </div>
        </MainUploadLabel>
        <span>
          {selectedImage
            ? formatFileSize(selectedImage.size)
            : `Max size: ${formatFileSize(maxAvatarSize)}`}
        </span>
        <div>
          {selectedImage && (
            <>
              <button onClick={removeSelectedImage} ref={removeButtonRef}>
                Cancel
              </button>
              <button
                ref={uploadButtonRef}
                onClick={async () => {
                  if (selectedImage) {
                    if (uploadingRef.current) {
                      uploadingRef.current.style.display = 'block';
                    }
                    if (uploadButtonRef.current) {
                      uploadButtonRef.current.disabled = true;
                    }
                    if (removeButtonRef.current) {
                      removeButtonRef.current.disabled = true;
                    }

                    const res = await edgestore.publicFiles.upload({
                      file: selectedImage,
                      onProgressChange: (progress) => {
                        console.log(progress);
                      },
                      options: {
                        replaceTargetUrl: currentImage,
                      },
                    });

                    const url = await saveAvatarUrl(res.url);
                    console.log('saved image URL', url);

                    if (uploadingRef.current) {
                      uploadingRef.current.style.display = 'none';
                    }
                    if (uploadButtonRef.current) {
                      uploadButtonRef.current.disabled = false;
                    }
                    if (removeButtonRef.current) {
                      removeButtonRef.current.disabled = false;
                    }
                  }
                }}
              >
                Apply
              </button>
            </>
          )}
        </div>
      </UploadWrapper>
    </>
  );
}
