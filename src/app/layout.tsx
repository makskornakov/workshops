import './globals.linaria.global';
import { Inter } from 'next/font/google';
import NavBar from '~/components/NavBar';
import Providers from '~/components/providers';
// import '@uploadthing/react/styles.css';

const inter = Inter({ subsets: ['latin'] });
// const agbalumo = Agbalumo({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Mentoring Workshops',
  description:
    'Workshop studio for (not only) mentoring, created in collaboration with Mentoring Europe',
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
