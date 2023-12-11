'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackLink({ customPathname }: { customPathname?: string }) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return (
    <Link href={customPathname ?? './'}>
      <FiArrowLeft />
    </Link>
  );
}
