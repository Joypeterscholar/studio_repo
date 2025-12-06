'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page
    router.replace('/home');
  }, [router]);

  return null; // This page is only for redirection
}
