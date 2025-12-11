'use client';
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore, doc, collection } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { useMemo } from 'react';

export * from './provider';
export { FirebaseClientProvider } from './client-provider';

export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { useUser } from './auth/use-user';


let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// This function should only be called on the client side.
export function initializeFirebase() {
  if (typeof window !== 'undefined') {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      firestore = getFirestore(app);
    }
  }
  return { app, auth, firestore };
}


export function useUserById(id: string | null | undefined) {
    const firestore = useFirestore();
    
    const docRef = useMemo(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'users', id);
    }, [firestore, id]);

    return useDoc(docRef);
}

export function useUsers() {
    const firestore = useFirestore();

    const collectionRef = useMemo(() => {
        if (!firestore) return null;
        return collection(firestore, 'users');
    }, [firestore]);
    
    return useCollection(collectionRef);
}

export function useConversations() {
    const firestore = useFirestore();

    const collectionRef = useMemo(() => {
        if (!firestore) return null;
        return collection(firestore, 'conversations');
    }, [firestore]);

    return useCollection(collectionRef);
}

export function useConversationById(id: string | null | undefined) {
    const firestore = useFirestore();

    const docRef = useMemo(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'conversations', id);
    }, [firestore, id]);
    
    return useDoc(docRef);
}
