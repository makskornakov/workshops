'use client';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { EdgeStoreProvider } from '~/lib/edgestore';

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <EdgeStoreProvider>{props.children}</EdgeStoreProvider>
    </SessionProvider>
  );
};

export default Providers;
