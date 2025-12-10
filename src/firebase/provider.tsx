'use client';

import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import {
  createContext,
  useContext,
  ReactNode,
} from 'react';

export const FirebaseContext = createContext<{
  app?: FirebaseApp;
  auth?: Auth;
  firestore?: Firestore;
} | null>(null);

export function FirebaseProvider({
  children,
  app,
  auth,
  firestore,
}: {
  children: ReactNode;
  app?: FirebaseApp;
  auth?: Auth;
  firestore?: Firestore;
}) {
  return (
    <FirebaseContext.Provider value={{ app, auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  return useContext(FirebaseContext)!;
};

export const useFirebaseApp = () => {
  return useFirebase()?.app;
};

export const useAuth = () => {
  return useFirebase()?.auth;
};

export const useFirestore = () => {
  return useFirebase()?.firestore;
};
