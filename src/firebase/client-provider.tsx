'use client';
import { FirebaseProvider, initializeFirebase, useFirebase } from '@/firebase';
import { ReactNode, useEffect, useState } from 'react';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState(initializeFirebase());

  useEffect(() => {
    setServices(initializeFirebase());
  }, []);

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
