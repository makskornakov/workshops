'use client';
import { getProviders, signIn } from 'next-auth/react';
import SignInEmail from '~/components/emailForm';

export function SignInButtons({
  providers,
}: {
  providers: NonNullable<Awaited<ReturnType<typeof getProviders>>>;
}) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.type === 'email' ? (
            <SignInEmail />
          ) : (
            // <form
            //   onSubmit={(event) => {
            //     event.preventDefault();
            //     const formData = new FormData(event.currentTarget);
            //     console.log('form', [...formData.entries()]);
            //     signIn(provider.id, undefined, {
            //       email: 'ginzburg.arthur@gmail.com',
            //     });
            //   }}
            // >
            //   <label>
            //     Email address
            //     <input type="email" id="email" name="email" />
            //   </label>
            //   <button type="submit">Sign in with Email</button>
            // </form>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          )}
        </div>
      ))}
    </>
  );
}
