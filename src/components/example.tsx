// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
'use client';
import type { FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import { useState, useCallback } from 'react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { useUploadThing } from '~/app/utils/uploadathing';

/** @deprecated */
// export function MultiUploader() {
//   const [files, setFiles] = useState<File[]>([]);
//   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
//     setFiles(acceptedFiles);
//   }, []);

//   const { startUpload, permittedFileInfo } = useUploadThing('myEndpoint', {
//     onClientUploadComplete: () => {
//       alert('uploaded successfully!');
//     },
//     onUploadError: () => {
//       alert('error occurred while uploading');
//     },
//     onUploadBegin: () => {
//       alert('upload has begun');
//     },
//   });

//   const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
//   });

//   // useU

//   return (
//     <div>
//       <input {...getInputProps()} />
//       <div>
//         {files.length > 0 && (
//           <button onClick={() => startUpload(files)}>Upload {files.length} files</button>
//         )}
//       </div>
//       Drop files here!
//     </div>
//   );
// }
