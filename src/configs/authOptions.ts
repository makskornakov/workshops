import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
// import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import prisma from '../../lib/prisma';
import { sendVerification } from '~/configs/email/verificationEmail';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_SECRET ?? '',
  pages: {
    signIn: '/auth/signin',
    // error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/email-verified',
  },

  providers: [
    GoogleProvider({
      // name: 'Google',
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
      // allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        console.log('Google profile', profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      // style: { logo: '/github.svg', bg: '#24292f', text: '#fff' },
      // allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        // console.log('GH profile', profile);
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
        return sendVerification({ identifier: email, url, provider: { server, from } });
      },
    }),
    // {
    //   id: 'resend',
    //   type: 'email',
    //   sendVerificationRequest,
    // },
  ],
  events: {
    async linkAccount({ account, profile }) {
      console.log('linkAccount.profile', profile);
      console.log('account', account);
      // add name from google to prisma account field name
      // providerAccountId: account.providerAccountId,
      const updatedAccount = await prisma.account.update({
        data: {
          name: profile.name,
        },
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
      });

      console.log(updatedAccount);

      // prisma.account.update({
      //   where: {
      //     id: account.id
      //   },
      //   data: {
      //     name
      //   }
      // })
    },
  },
};
