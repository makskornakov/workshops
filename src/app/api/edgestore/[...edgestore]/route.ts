import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { maxAvatarSize, maxMediaSize } from '../../../../config';
import { getUser } from '~/app/utils/prismaUser';
import prisma from '../../../../../lib/prisma';
import z from 'zod';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  mediaFiles: es
    .fileBucket({ maxSize: maxMediaSize, accept: ['image/*'] })
    .input(
      z.object({
        materialId: z.string(),
      }),
    )
    .beforeDelete(async ({ fileInfo }) => {
      // const targetUrl = fileInfo.replaceTargetUrl;
      // const materialId = input.materialId;
      const user = await getUser();

      if (!user) throw new Error('User not found');
      console.log('hi from beforeDelete');
      if (!fileInfo.url) return false;
      console.log('fileInfo.url', fileInfo.url);
      console.log('user.id', user.id);
      try {
        const material = await prisma.material.findUniqueOrThrow({
          where: {
            mediaUrl: fileInfo.url,
            authorId: user.id,
          },
          // we only need the authorId from author
          select: { author: { select: { id: true } } },
        });
        console.log('material', material);
      } catch (error) {
        throw new Error(
          "You are not the author of this material or there's no uploaded media associated with it",
        );
      }
      // if (user.id !== material?.author.id)
      //   throw new Error('You are not the author of this material');

      return true;
    })
    .beforeUpload(async ({ fileInfo, input }) => {
      const targetUrl = fileInfo.replaceTargetUrl;
      const materialId = input.materialId;
      const user = await getUser();
      if (!user) throw new Error('User not found');

      const material = await prisma.material.findUnique({
        where: { id: materialId },
        // we only need the authorId from author
        select: { author: { select: { id: true } }, mediaUrl: true },
      });

      if (user.id !== material?.author.id)
        throw new Error('You are not the author of this material');

      if (material?.mediaUrl && material.mediaUrl !== targetUrl)
        throw new Error('Urls do not match, so youre probably impersonating another user');

      return true;
    }),
  avatarFiles: es.imageBucket({ maxSize: maxAvatarSize }).beforeUpload(async ({ fileInfo }) => {
    const targetUrl = fileInfo.replaceTargetUrl;
    const user = await getUser();
    // console.log('user', user);
    if (!user) throw new Error('User not found');

    const userInDb = await prisma.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });
    if (!userInDb) throw new Error('User not found');
    if (userInDb.image !== targetUrl)
      throw new Error('Urls do not match, so youre probably impersonating another user');

    return true;
  }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
