import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
// import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import prisma from '../../../lib/prisma';
import { sendVerification } from '~/app/utils/verificationEmail';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_SECRET ?? '',
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/email-verified',
  },
  providers: [
    // CredentialsProvider({
    //   name: 'Email',
    //   credentials: {
    //     email: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'example@example.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //     confirmPassword: { label: 'Confirm Password', type: 'password' },
    //   },

    //   async authorize(credentials) {
    //     const user = {
    //       email: credentials.email,
    //       image: '',
    //     };
    //     if (credentials.password !== credentials.confirmPassword) {
    //       throw new Error('Passwords do not match');
    //     }
    //     if (user) {
    //       return user;
    //     }
    //   },
    // }),
    GoogleProvider({
      // name: 'Google',
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
      // allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        // console.log('Google profile', profile);
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
        return await sendVerification({ identifier: email, url, provider: { server, from } });
      },
    }),
    // {
    //   id: 'resend',
    //   type: 'email',
    //   sendVerificationRequest,
    // },
  ],
};
