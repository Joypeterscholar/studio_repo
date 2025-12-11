
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  // This page is temporarily disabled due to backend platform issues.
  // We will re-enable it as soon as the issues are resolved.
  useEffect(() => {
    router.push('/');
  }, [router]);
  
  return null;
}
