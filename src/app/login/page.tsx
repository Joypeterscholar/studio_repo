'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-4xl font-bold text-primary">Login</h1>
        <p className="mt-4 text-muted-foreground">This is a placeholder login page.</p>
        <Button asChild className="mt-6">
            <Link href="/signup">Back to Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
