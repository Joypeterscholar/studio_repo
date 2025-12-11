'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { initializeFirebase } from '../index';
import { placeholderImages } from '@/lib/placeholder-images';

// This function should only be called on the client side.
const { auth, firestore } = initializeFirebase();

export async function signUpWithEmail(email: string, password: string, username: string): Promise<UserCredential> {
  if (!auth || !firestore) {
    throw new Error('Firebase has not been initialized');
  }
  
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Now, create a user document in Firestore
  const userRef = doc(firestore, 'users', user.uid);
  
  // Create a default user profile
  await setDoc(userRef, {
    name: username,
    age: 18, // Default age
    bio: 'Just joined LinqUp! Looking to connect.',
    interests: ['New User'],
    image: placeholderImages.find(p => p.id === 'user-self') || placeholderImages[0],
    location: 'Unknown',
    isOnline: true,
    gallery: [],
  });

  return userCredential;
}

export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  if (!auth) {
    throw new Error('Firebase Auth has not been initialized');
  }
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser(): Promise<void> {
  if (!auth) {
    throw new Error('Firebase Auth has not been initialized');
  }
  return signOut(auth);
}
