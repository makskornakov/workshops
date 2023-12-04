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
        <div>
          This is the main page
          {/* <LoginButton /> */}
          {/* <RegisterButton /> */}
          {/* <LogoutButton /> */}
          {/* <ProfileButton /> */}
          {/* <h1>Server Session</h1> */}
          {/* <pre>{JSON.stringify(session)}</pre> */}
          {/* <MagicLinkEmail
          url="http://localhost:3000/api/auth/signin/email"
          host="http://localhost:3000"
        /> */}
        </div>
        {/* <h1>Welcome to Next.js with Linaria!</h1>
  
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul> */}
      </Main>
    </>
  );
}
