import { getCsrfToken } from 'next-auth/react';
import { HiOutlineMail } from 'react-icons/hi';
import { LoginProviderButton } from './signIn.styled';

export default async function SignInEmail() {
  const csrfToken = await getCsrfToken();

  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" />
      </label>

      <LoginProviderButton type="submit" bg="white">
        <HiOutlineMail />
        Sign in with Email
      </LoginProviderButton>
    </form>
  );
}
