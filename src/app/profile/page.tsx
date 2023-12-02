import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../../lib/prisma';
import { redirect } from 'next/navigation';
import { getUser, getUserAccounts } from '../utils/prismaUser';
import { revalidatePath } from 'next/cache';
import { ProfileContainer, ProfileSection, ProfileSidebar } from './profile.styled';
import { UploadDnD } from '~/components/UploadZone';

export default async function Profile() {
  const user = await getUser();

  return (
    user && (
      <>
        <ProfileSection>
          {user.image && (
            <Image src={user.image} alt={user?.name + ' photo'} width={100} height={100} />
          )}
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <form
            action={async (formData) => {
              'use server';
              const newName = formData.get('name');
              if (!newName || typeof newName !== 'string' || newName.length < 3) {
                throw new Error('Name validation failed');
              }
              const user = await getUser();
              if (!user) {
                throw new Error('Session or user is not present');
              }
              if (typeof user.email !== 'string') {
                throw new Error("User's email type is invalid");
              }
              if (newName === user.name) {
                // бля а как выбросить ошибку и куда ана паппадёт
                return;
              }
              await prisma.user.update({
                data: { name: newName },
                where: { email: user.email },
                // TODO throw error if user not found
              });
              revalidatePath('/profile', 'page');
            }}
          >
            <input type="text" name="name" defaultValue={user.name ?? ''} />
            <button type="submit">Submit</button>
          </form>
          <UploadDnD />
        </ProfileSection>
        <ProfileSection></ProfileSection>
      </>
    )
  );
}
