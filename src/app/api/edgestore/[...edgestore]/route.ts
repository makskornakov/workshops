import { initEdgeStore } from '@edgestore/server';
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from '@edgestore/server/adapters/next/app';
import { maxAvatarSize } from './config';
import { getUser } from '~/app/utils/prismaUser';
import prisma from '../../../../../lib/prisma';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({ maxSize: maxAvatarSize }).beforeUpload(async ({ fileInfo }) => {
    const targetUrl = fileInfo.replaceTargetUrl;
    const user = await getUser();
    // console.log('user', user);
    if (!user) throw new Error('User not found');

    const backUrl = await prisma.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });
    if (!backUrl) throw new Error('User not found');
    if (backUrl.image !== targetUrl)
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
