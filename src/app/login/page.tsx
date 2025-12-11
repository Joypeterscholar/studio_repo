
'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  // This page is temporarily disabled due to backend platform issues.
  // We will re-enable it as soon as the issues are resolved.
  if (typeof window !== 'undefined') {
    router.push('/');
  }
  return null;
}
