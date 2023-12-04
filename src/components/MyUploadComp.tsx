'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useUploadThing } from '~/app/utils/uploadathing';
import { VscLoading } from 'react-icons/vsc';
import { MainUploadLabel, UploadWrapper } from './upload.styled';

export default function MyUploadComp({ currentImage }: { currentImage: string }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userImage, setUserImage] = useState<string>(currentImage);

  const uploadingRef = useRef<HTMLDivElement>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);
  const removeButtonRef = useRef<HTMLButtonElement>(null);

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImageURL = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
      setUserImage(uploadedImageURL);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setUserImage(currentImage);
  };

  const { startUpload, permittedFileInfo } = useUploadThing('myEndpoint', {
    onBeforeUploadBegin: (files: File[]) => {
      if (uploadingRef.current) {
        uploadingRef.current.style.display = 'block';
      }
      if (uploadButtonRef.current) {
        uploadButtonRef.current.disabled = true;
      }
      if (removeButtonRef.current) {
        removeButtonRef.current.disabled = true;
      }
      return files;
    },
    // onUploadBegin: (fileName: string) => {
    //   console.log('uploading---------');
    // },
    onClientUploadComplete: () => {
      // alert('Picture changed successfully!');
      console.log('upload complete');
      if (uploadingRef.current) {
        uploadingRef.current.style.display = 'none';
      }
      if (uploadButtonRef.current) {
        uploadButtonRef.current.disabled = false;
      }
      if (removeButtonRef.current) {
        removeButtonRef.current.disabled = false;
      }
      setSelectedImage(null);
      window.location.reload();
    },
    onUploadError: () => {
      alert('error occurred while uploading');
      console.log('upload error');
      if (uploadingRef.current) {
        uploadingRef.current.style.display = 'none';
      }
      if (uploadButtonRef.current) {
        uploadButtonRef.current.disabled = false;
      }
      if (removeButtonRef.current) {
        removeButtonRef.current.disabled = false;
      }
    },
    onUploadProgress: (progress) => {
      console.log('progress', progress);
    },
  });

  function displaySize(size: number) {
    // size is in bytes , transform to Kb or Mb depending on size
    if (size / 1024 / 1024 > 1) {
      return (size / 1024 / 1024).toFixed(2) + ' mb';
    } else {
      return (size / 1024).toFixed(2) + ' kb';
    }
  }

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
            ? // size is in bytes , transform to Kb
              displaySize(selectedImage.size)
            : `Max size: ${permittedFileInfo?.config.image?.maxFileSize}`}
        </span>
        <div>
          {selectedImage && (
            <>
              <button onClick={removeSelectedImage} ref={removeButtonRef}>
                Remove
              </button>
              <button
                ref={uploadButtonRef}
                onClick={() => startUpload([selectedImage], { foo: selectedImage.size.toString() })}
              >
                Upload Image
              </button>
            </>
          )}
        </div>
      </UploadWrapper>
    </>
  );
}
