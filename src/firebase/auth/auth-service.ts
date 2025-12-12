
'use client';

import {
  type Auth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
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
      isAdmin: false, // Ensure isAdmin is set for new users
    });
  } else {
    await updateDoc(userRef, { isOnline: true });
  }
};

export const signInAsGuest = async (auth: Auth, firestore: Firestore): Promise<void> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();
            if (user && !user.isAnonymous) {
                // If a non-anonymous user is somehow logged in, sign them out first
                await signOut(auth);
            }
            
            if (user && user.isAnonymous) {
                // If anonymous user is already signed in, just ensure their profile is online and resolve.
                await updateDoc(doc(firestore, 'users', user.uid), { isOnline: true }).catch(console.error);
                resolve();
            } else {
                // If no user, sign in anonymously and create profile.
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
  // For guest mode, signing out isn't strictly necessary unless you want to clear the session.
  // We'll keep the anonymous session alive.
  // return signOut(auth);
}
