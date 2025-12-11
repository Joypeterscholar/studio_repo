'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  type UserCredential,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeFirebase } from '../index';
import { placeholderImages } from '@/lib/placeholder-images';

// This function should only be called on the client side.
const { auth, firestore } = initializeFirebase();

const createUserProfile = async (user: FirebaseUser) => {
  if (!firestore) throw new Error('Firestore not initialized');
  const userRef = doc(firestore, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      id: user.uid,
      name: user.displayName || 'New User',
      age: 18,
      bio: 'Just joined LinqUp! Looking to connect.',
      interests: ['New User'],
      image: user.photoURL
        ? {
            id: 'user-google-profile',
            description: 'Google profile picture',
            imageUrl: user.photoURL,
            imageHint: 'profile picture',
          }
        : placeholderImages.find((p) => p.id === 'user-self') ||
          placeholderImages[0],
      location: 'Unknown',
      isOnline: true,
      gallery: [],
    });
  } else {
    await updateDoc(userRef, { isOnline: true });
  }
};

export async function signUpWithEmail(email: string, password: string, username: string): Promise<UserCredential> {
  if (!auth) throw new Error('Firebase Auth has not been initialized');
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // We can't update the user's display name directly on creation with password auth
  // but we can pass it when we create the firestore doc
  await createUserProfile(userCredential.user);
  
  if (firestore) {
      const userRef = doc(firestore, 'users', userCredential.user.uid);
      await updateDoc(userRef, { name: username });
  }


  return userCredential;
}

export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  if (!auth || !firestore) {
    throw new Error('Firebase Auth has not been initialized');
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userRef = doc(firestore, 'users', userCredential.user.uid);
  await updateDoc(userRef, { isOnline: true });
  return userCredential;
}

export async function signInWithGoogle(): Promise<UserCredential> {
  if (!auth) throw new Error('Firebase Auth has not been initialized');
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await createUserProfile(userCredential.user);
  return userCredential;
}

export async function signOutUser(): Promise<void> {
  if (!auth || !firestore) {
    throw new Error('Firebase has not been initialized');
  }
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
        const userRef = doc(firestore, 'users', currentUser.uid);
        await updateDoc(userRef, { isOnline: false });
    } catch (error) {
        console.error("Error updating user status on logout:", error);
    }
  }
  return signOut(auth);
}
