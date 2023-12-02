'use client';
import '@uploadthing/react/styles.css';
import { UploadDropzone } from '../app/utils/uploadathing';

export function UploadDnD() {
  return (
    <UploadDropzone
      endpoint="profilePicture"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log('Files: ', res);
        alert('Picture changed successfully!');
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
