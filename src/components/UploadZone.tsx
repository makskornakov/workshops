'use client';
import '@uploadthing/react/styles.css';
import { UploadButton } from '../app/utils/uploadathing';
import { VscLoading } from 'react-icons/vsc';
import { UploadButtonStyle } from '~/app/profile/profile.styled';

export function UploadDnD({ currentPicture }: { currentPicture: string }) {
  return (
    <UploadButton
      className="custom-class"
      appearance={{
        button({ ready, isUploading }) {
          return {
            width: '8rem',
            height: '8rem',
            backgroundImage: 'url(' + currentPicture + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
          };
          // return `custom-button ${ready ? 'custom-button-ready' : 'custom-button-not-ready'} ${
          //   isUploading ? 'custom-button-uploading' : ''
          // }`;
        },
        // container: 'custom-container',
        // allowedContent: 'custom-allowed-content',
      }}
      content={{
        button({ ready, isUploading }) {
          return (
            <>
              {ready && !isUploading && <p></p>}
              {ready && isUploading && <VscLoading />}
            </>
          );
        },
      }}
      endpoint="profilePicture"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log('Files: ', res);
        // alert('Picture changed successfully!');
        // ! Change this to something normal
        window.location.reload();
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
