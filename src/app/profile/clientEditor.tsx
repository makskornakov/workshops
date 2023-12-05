'use client';

import { useState } from 'react';
import { getUser } from '../utils/prismaUser';
import { ProfileForm } from './profile.styled';

export default function ProfileSettingsForm({
  user,
  action,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
  action: (formData: FormData) => void;
}) {
  const [name, setName] = useState(user?.name ?? '');

  return (
    user && (
      <ProfileForm action={action}>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit" disabled={name === user.name}>
          Save
        </button>
      </ProfileForm>
    )
  );
}
