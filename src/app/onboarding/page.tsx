'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the root splash screen page
    router.replace('/');
  }, [router]);

  return null;
}
