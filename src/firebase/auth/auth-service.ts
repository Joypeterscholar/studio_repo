
'use client';

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
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
    const randomName = `User-${user.uid.substring(0, 5)}`;
    await setDoc(userRef, {
      id: user.uid,
      name: user.displayName || randomName,
      age: 25,
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

export const signInAsGuest = async (): Promise<void> => {
    if (!auth) throw new Error('Firebase Auth has not been initialized');

    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe(); // Unsubscribe to avoid multiple calls
            if (user) {
                // User is already signed in.
                await updateDoc(doc(firestore!, 'users', user.uid), { isOnline: true });
                resolve();
            } else {
                // No user is signed in, sign in anonymously.
                try {
                    const userCredential = await signInAnonymously(auth);
                    await createUserProfile(userCredential.user);
                    resolve();
                } catch (error) {
                    console.error("Error signing in anonymously:", error);
                    reject(error);
                }
            }
        }, (error) => {
            // Handle errors in onAuthStateChanged
            console.error("Auth state change error:", error);
            reject(error);
        });
    });
};

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
