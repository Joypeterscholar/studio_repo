import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

import { getMockConversations, getMockConversationById, getMockUsers, getMockUserById, getMockLoggedInUser } from './mock-data';

export * from './provider';
export { FirebaseClientProvider } from './client-provider';

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


// MOCK DATA HOOKS
// These hooks simulate fetching data from Firebase.
// They will be replaced with actual Firestore hooks later.

export function useUser() {
    // In a real app, this would use `useAuthState` from `react-firebase-hooks/auth`
    // and then fetch the user profile from Firestore.
    const user = getMockLoggedInUser();
    return { data: user, loading: false };
}

export function useUserById(id: string) {
    const user = getMockUserById(id);
    return { data: user, loading: false };
}

export function useUsers() {
    const users = getMockUsers();
    return { data: users, loading: false };
}

export function useConversations() {
    const conversations = getMockConversations();
    return { data: conversations, loading: false };
}

export function useConversationById(userId: string) {
    // This logic is a bit different because our mock data identifies conversations by user id
    const conversations = getMockConversations();
    const conversation = conversations.find(c => c.userId === userId);
    return { data: conversation, loading: false };
}
