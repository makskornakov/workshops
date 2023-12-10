import './globals.linaria.global';
import { Inter } from 'next/font/google';
import NavBar from '~/components/layout/navbar/NavBar';
import Providers from '~/components/layout/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mentoring Workshops',
  description:
    'Workshop studio for (not only) mentoring, created in collaboration with Mentoring Europe',
  icons: [
    {
      rel: 'icon',
      href: '/dark-favicon.ico',
      url: '/dark-favicon.ico',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      href: '/light-favicon.ico',
      url: '/light-favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />

          {children}
        </Providers>
      </body>
    </html>
  );
}
