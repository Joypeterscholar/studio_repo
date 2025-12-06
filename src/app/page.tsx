'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/story');
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <p>Redirecting to story page...</p>
        </div>
    );
}
