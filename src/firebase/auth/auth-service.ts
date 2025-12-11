
'use client';

import {
  type Auth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
  createUserWithEmailAndPassword,
  type UserCredential,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { type Firestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { placeholderImages } from '@/lib/placeholder-images';

const createUserProfile = async (firestore: Firestore, user: FirebaseUser) => {
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

export const signInAsGuest = async (auth: Auth, firestore: Firestore): Promise<void> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();
            if (user) {
                await updateDoc(doc(firestore, 'users', user.uid), { isOnline: true });
                resolve();
            } else {
                try {
                    const userCredential = await signInAnonymously(auth);
                    await createUserProfile(firestore, userCredential.user);
                    resolve();
                } catch (error) {
                    console.error("Error signing in anonymously:", error);
                    reject(error);
                }
            }
        }, (error) => {
            console.error("Auth state change error:", error);
            reject(error);
        });
    });
};

export async function signOutUser(auth: Auth, firestore: Firestore): Promise<void> {
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

// The following functions are temporarily unused due to platform issues
// but are kept for when the service is restored.

export async function signUpWithEmail(auth: Auth, firestore: Firestore, email: string, password: string, username: string): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(firestore, userCredential.user);
  return userCredential;
}

export async function signInWithEmail(auth: Auth, firestore: Firestore, email: string, password: string): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await updateDoc(doc(firestore, 'users', userCredential.user.uid), { isOnline: true });
    return userCredential;
}

export async function signInWithGoogle(auth: Auth, firestore: Firestore): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await createUserProfile(firestore, userCredential.user);
    return userCredential;
}
