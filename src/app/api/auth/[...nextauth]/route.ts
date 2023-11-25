import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_SECRET ?? '',
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
    //   },
    //   async authorize(credentials) {
    //     const user = { id: '1', name: credentials?.email || '', email: credentials?.email || '' };
    //     return user;
    //   },
    // }),
    GoogleProvider({
      // name: 'Google',
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
      // allowDangerousEmailAccountLinking: true,
      // async profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture,
      //   };
      // },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
