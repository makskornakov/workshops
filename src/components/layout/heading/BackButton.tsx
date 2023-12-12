'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton({ requireConfirmation }: { requireConfirmation?: boolean }) {
  return (
    <Link
      href={'./'}
      onClick={(e) => {
        if (requireConfirmation) {
          if (!confirm('Are you sure you want to go back?')) {
            e.preventDefault();
          }
        }
      }}
    >
      <FiArrowLeft />
    </Link>
  );
}
