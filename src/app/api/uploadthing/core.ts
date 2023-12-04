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
      const user = await getUser();

      if (!user) throw new Error('You must be logged in to upload a profile picture');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId } = metadata;
      if (!userId) throw new Error('No user id found');
      if (!file.url) throw new Error('No file url found');
      await prisma.user.update({
        where: { id: userId },
        data: { image: file.url },
      });
      console.log('Uploaded by user', userId);
      return {
        // idk if this does anythi
        uploadedBy: userId,
      };
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
