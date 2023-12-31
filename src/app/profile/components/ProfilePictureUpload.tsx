'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { MainUploadLabel, UploadButton, UploadWrapper } from '../../../components/upload.styled';
import { useEdgeStore } from '~/lib/edgestore';
import { saveAvatarUrl } from '~/actions/serverActions';
import { formatFileSize } from '@edgestore/react/utils';
import { maxAvatarSize } from '~/configs/config';

export default function ProfilePictureUpload({ currentImage }: { currentImage: string }) {
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
        {selectedImage && (
          <div>
            <UploadButton onClick={removeSelectedImage} ref={removeButtonRef} red>
              Cancel
            </UploadButton>
            <UploadButton
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

                  const res = await edgestore.avatarFiles.upload({
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

                  setUserImage(url.url);
                  setSelectedImage(null);
                }
              }}
            >
              Apply
            </UploadButton>
          </div>
        )}
      </UploadWrapper>
    </>
  );
}
