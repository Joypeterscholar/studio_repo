
'use client';

import { useEffect, useState } from 'react';
import { type User as FirebaseAuthUser, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { useAuth, useFirestore } from '../provider';
import type { User } from '@/lib/data';
import { signInAsGuest } from './auth-service';

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
    }

    // Ensure user is signed in (anonymously if needed)
    signInAsGuest(auth, firestore).then(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseAuthUser | null) => {
            if (firebaseUser) {
              const userDocRef = doc(firestore, 'users', firebaseUser.uid);
              const unsubDoc = onSnapshot(userDocRef, (userDoc) => {
                  if (userDoc.exists()) {
                      setUser({ data: { id: userDoc.id, ...userDoc.data() } as User, loading: false });
                  } else {
                      // This might happen briefly if the doc creation is slow
                      setUser({ data: null, loading: true });
                  }
              });
              return () => unsubDoc();
            } else {
              setUser({ data: null, loading: false });
            }
        });
        return () => unsubscribe();
    }).catch(error => {
        console.error("Failed to ensure user is signed in:", error);
        setUser({ data: null, loading: false });
    });

  }, [auth, firestore]);

  return user;
}
