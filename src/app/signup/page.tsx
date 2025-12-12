'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: 'Page Disabled',
      description: 'Sign up is temporarily disabled. You are proceeding as a guest.',
    });
    router.push('/home');
  }, [router, toast]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
