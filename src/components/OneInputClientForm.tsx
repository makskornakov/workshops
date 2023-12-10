'use client';

import { useState } from 'react';
import { getUser } from '../utils/prismaUser';
import { ProfileForm } from '../app/profile/profile.styled';
import { useFormStatus } from 'react-dom';

type User = NonNullable<Awaited<ReturnType<typeof getUser>>>;

export default function ProfileSettingsForm({
  user,
  action,
}: {
  user: User;
  action: (formData: FormData) => void;
}) {
  return (
    <ProfileForm action={action}>
      <StatedFormElements user={user} />
    </ProfileForm>
  );
}

const StatedFormElements = ({ user }: { user: User }) => {
  const { pending } = useFormStatus();
  const [name, setName] = useState(user?.name ?? '');

  return (
    <>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit" disabled={pending || name === user.name}>
        {pending ? 'Saving...' : 'Save'}
      </button>
    </>
  );
};
