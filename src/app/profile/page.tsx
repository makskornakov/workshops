import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../../lib/prisma';
import { redirect } from 'next/navigation';
import { getUser, getUserAccounts } from '../utils/prismaUser';
import { revalidatePath } from 'next/cache';
import {
  AvatarSection,
  ProfileContainer,
  ProfileForm,
  ProfileSection,
  ProfileSectionFooter,
  ProfileSectionInside,
  ProfileSidebar,
} from './profile.styled';
// import { UploadDnD } from '~/components/UploadZone';
import MyUploadComp from '~/components/MyUploadComp';
import ProfileSettingsForm from './clientEditor';
// import { MultiUploader } from '~/components/example';
// import MyCompAgain from '~/components/myCompAgain';

export default async function Profile() {
  const user = await getUser();

  return (
    user && (
      <>
        <AvatarSection>
          <ProfileSectionInside>
            <h2>Profile Picture</h2>
            <p>Avatar is used across the site, in future it will be used for public workshops</p>
          </ProfileSectionInside>
          <ProfileSectionInside>
            {user.image && <MyUploadComp currentImage={user.image} />}
          </ProfileSectionInside>
          <ProfileSectionFooter>
            <p>Better use square image.</p>
          </ProfileSectionFooter>
        </AvatarSection>
        <ProfileSection>
          <ProfileSectionInside>
            <h2>Profile Name</h2>
            <p>Change your profile name, it will be used across the site.</p>
            <ProfileSettingsForm
              user={user}
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
            />
            {/* <ProfileForm
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
              <button type="submit">Save</button>
            </ProfileForm> */}
          </ProfileSectionInside>
          <ProfileSectionFooter>
            <p>Use your full name or nickname.</p>
          </ProfileSectionFooter>
        </ProfileSection>
      </>
    )
  );
}
