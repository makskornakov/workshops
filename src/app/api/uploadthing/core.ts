import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getUser } from '~/app/utils/prismaUser';
import prisma from '../../../../lib/prisma';
const f = createUploadthing();

// const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  profilePicture: f(['image'])
    .middleware(async ({ req, res }) => {
      const user = await getUser();

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
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
