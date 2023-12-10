import { getServerSession } from 'next-auth/next';
import { authOptions } from '../configs/authOptions';
import prisma from '../../lib/prisma';

export async function getUser() {
  const session = await getServerSession(authOptions);

  if (session) {
    const userEmail = session.user?.email;
    if (userEmail) {
      return await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });
    }
  }
}

export async function getUserAccounts(
  uncertainUser: Awaited<ReturnType<typeof getUser>> | ReturnType<typeof getUser> = getUser(),
) {
  const user = await uncertainUser;

  return user
    ? await prisma.account.findMany({
        where: {
          user: {
            email: user.email,
          },
        },
      })
    : null;
}
