'use server';

import { getUser } from '~/app/utils/prismaUser';
import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { useEdgeStore } from '~/lib/edgestore';

export async function saveAvatarUrl(url: string) {
  const user = await getUser();
  if (!user) throw new Error('No user found');

  await prisma.user.update({
    where: { id: user.id },
    data: { image: url },
  });
  console.log('Uploaded by user', user.email);

  revalidatePath('/profile', 'page');

  return { url };
}

// export async function serverUploadFunction(selectedImage: File, edgestore: any) {

//   if (selectedImage) {
//     // if (uploadingRef.current) {
//     //   uploadingRef.current.style.display = 'block';
//     // }
//     // if (uploadButtonRef.current) {
//     //   uploadButtonRef.current.disabled = true;
//     // }
//     // if (removeButtonRef.current) {
//     //   removeButtonRef.current.disabled = true;
//     // }

//     const res = await edgestore.publicFiles.upload({
//       file: selectedImage,
//       onProgressChange: (progress) => {
//         console.log(progress);
//       },
//       options: {
//         replaceTargetUrl: currentImage,
//       },
//     });

//     const url = await saveAvatarUrl(res.url);
//     console.log('saved image URL', url);

//     if (uploadingRef.current) {
//       uploadingRef.current.style.display = 'none';
//     }
//     if (uploadButtonRef.current) {
//       uploadButtonRef.current.disabled = false;
//     }
//     if (removeButtonRef.current) {
//       removeButtonRef.current.disabled = false;
//     }
//   }
// }
