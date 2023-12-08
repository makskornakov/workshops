'use client';
import { Material } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { assignMaterialMediaUrl } from '~/actions/saveAvatarUrl';
import { useEdgeStore } from '~/lib/edgestore';

export default function ClientMaterialForm({
  action,
  // uploadAction,
  material,
}: {
  action: (formData: FormData) => void;
  // uploadAction: (formData: FormData) => void;
  material: Material;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(material.mediaUrl);
  const { edgestore } = useEdgeStore();

  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedImageURL = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(event.target.files[0]);
      setMediaUrl(uploadedImageURL);
      // setUserImage(uploadedImageURL);
    }
  };
  const removeSelectedImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSelectedImage(null);
    setMediaUrl(material.mediaUrl);
    // delete media file in future
  };

  // const mediaUrl = material?.mediaUrl
  return (
    <>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '10rem' }}
        action={action}
        // onSubmit={(e) => {
        //   // console me title
        //   const data = new FormData(e.target as HTMLFormElement);
        //   const title = data.get('title') as string;

        //   const explicit = checkExplicit(title);
        //   if (explicit) {
        //     e.preventDefault();
        //     alert(`Сам ты ${explicit}`);
        //     return;
        //   }
        // }}
      >
        <label htmlFor="title">Title</label>

        <input type="text" id="title" name="title" defaultValue={material?.title} />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={material?.description} />
        {/* <label htmlFor="mediaUrl">Media URL</label> */}
        {/* <form action={uploadAction}> */}
        {/* {selectedImage && (
          <Image src={URL.createObjectURL(selectedImage)} alt="Thumb" width={150} height={150} />
        )} */}
        {(selectedImage || mediaUrl) && (
          <div style={{ width: '100%', position: 'relative', height: '150px' }}>
            <Image
              src={selectedImage ? URL.createObjectURL(selectedImage) : mediaUrl ?? ''}
              alt="Thumb"
              objectFit="contain"
              fill
            />
          </div>
        )}
        <input accept="image/*" type="file" id="my-upload-input" onChange={imageChange} />
        <button
          type="button"
          onClick={async () => {
            // e.preventDefault();
            if (!selectedImage || !material.id) return;
            try {
              const res = await edgestore.mediaFiles.upload({
                file: selectedImage,
                onProgressChange: (progress) => {
                  console.log(progress);
                },
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
              await assignMaterialMediaUrl(material.id, res.url);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Upload
        </button>
        <button onClick={removeSelectedImage}>Remove</button>

        {/* </form> */}
        {/* <label htmlFor="mediaUrl">Media URL</label> */}
        {/* <input
          type="text"
          id="mediaUrl"
          name="mediaUrl"
          defaultValue={material?.mediaUrl}
          value={mediaUrl ?? ''}
        /> */}
        <label htmlFor="Content">Content</label>
        <textarea id="content" name="content" defaultValue={material?.paragraph ?? ''} />

        <button type="submit">{material ? 'Edit' : 'Create'} Material</button>
      </form>
    </>
  );
}

// function checkExplicit(title: string): boolean | string {
//   const explicitWords = ['penis', 'hui'];

//   for (let word of explicitWords) {
//     if (title.toLowerCase().includes(word)) {
//       return word;
//     }
//   }

//   return false;
// }
