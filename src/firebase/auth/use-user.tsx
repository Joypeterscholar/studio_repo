'use client';

import { useEffect, useState } from 'react';
import { type User as FirebaseAuthUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { useAuth, useFirestore } from '../provider';
import type { User } from '@/lib/data';

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<{ data: User | null; loading: boolean }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    if (!auth || !firestore) {
      setUser({ data: null, loading: false });
      return;
    };

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: FirebaseAuthUser | null) => {
      if (firebaseUser) {
        const userDocRef = doc(firestore, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser({ data: { id: userDoc.id, ...userDoc.data() } as User, loading: false });
        } else {
          // You might want to create the user document here if it doesn't exist
          setUser({ data: null, loading: false });
        }
      } else {
        setUser({ data: null, loading: false });
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  return user;
}
