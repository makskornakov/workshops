import { getCsrfToken } from 'next-auth/react';
import { HiOutlineMail } from 'react-icons/hi';
import { EmailFormStyled, LoginProviderButton } from './signIn.styled';

export default async function SignInEmail() {
  const csrfToken = await getCsrfToken();

  return (
    <EmailFormStyled method="post" action="/api/auth/signin/email">
      <p>Or</p>
      <p>Sign in with your email address</p>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        <input type="email" id="email" name="email" placeholder="Example@domain.com" required />
      </label>

      <LoginProviderButton type="submit" bg="white">
        <HiOutlineMail />
        Sign in
      </LoginProviderButton>
    </EmailFormStyled>
  );
}
