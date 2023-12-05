// import Image from 'next/image';
// import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from '../components/buttons';

import { Main } from './page.styled';
// import prisma from '../../lib/prisma';
// import MagicLinkEmail from './utils/magicLink';
import { PageHeading } from './profile/profile.styled';

// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../lib/auth';

// const allUsers = async () => {
//   const users = await prisma.user.findMany();
//   return users;
// };

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // console.log(session);

  // const users = await allUsers();
  return (
    <>
      <PageHeading>Home Page</PageHeading>
      <Main>
        <div>This is the main page</div>
      </Main>
    </>
  );
}
