'use client';
import { FirebaseProvider, initializeFirebase } from '@/firebase';
import { ReactNode, useState, useEffect } from 'react';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  // Use state to hold the services. Initialize with nulls.
  const [services, setServices] = useState<{
    app: any;
    auth: any;
    firestore: any;
  } | null>(null);

  // useEffect runs only on the client, after the initial render.
  useEffect(() => {
    // This check ensures that Firebase is initialized only once.
    if (!services) {
      setServices(initializeFirebase());
    }
  }, [services]); // Dependency array ensures this runs only when `services` changes from null.

  // Don't render children until Firebase is initialized on the client.
  if (!services) {
    return null; // Or a loading spinner
  }

  return (
    <FirebaseProvider
      auth={services.auth}
      firestore={services.firestore}
      app={services.app}
    >
      {children}
    </FirebaseProvider>
  );
}
