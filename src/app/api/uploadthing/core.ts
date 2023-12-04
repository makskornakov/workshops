import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getUser } from '~/app/utils/prismaUser';
import prisma from '../../../../lib/prisma';
const f = createUploadthing();
import z from 'zod';

// const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  myEndpoint: f({ image: { maxFileCount: 1, maxFileSize: '512KB' } })
    // .input(z.object({ foo: z.string() }))
    .middleware(async ({ req }) => {
      // console.log(input.foo);
      const user = await getUser();
      // if larger than 4mb throw error
      // ? сли это убрать то можно загружать файлы любого размера походу
      // ! This is a very bad implementation, you should use the file size from the metadata instead ? (copilot comment)))
      // if (Number(input.foo) > 4000000) throw new Error('File too large');

      // Throw if user isn't signed in
      if (!user) throw new Error('You must be logged in to upload a profile picture');

      // Return userId to be used in onUploadComplete
      return { userEmail: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const userEmail = metadata.userEmail;
      if (!userEmail) throw new Error('No user email found');
      if (!file.url) throw new Error('No file url found');
      // Update user with new profile picture
      await prisma.user.update({
        where: { email: userEmail },
        data: { image: file.url },
      });
      console.log('Uploaded by user', userEmail);
    }),

  profilePicture: f(['image'])
    .middleware(async () => {
      const user = await getUser();
      if (!user) throw new Error('You must be logged in to upload a profile picture');
      return { userEmail: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const userEmail = metadata.userEmail;
      if (!userEmail) throw new Error('No user email found');
      if (!file.url) throw new Error('No file url found');
      await prisma.user.update({
        where: { email: userEmail },
        data: { image: file.url },
      });
      console.log('Uploaded by user', userEmail);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
