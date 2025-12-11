
'use client';

import { useMemo } from 'react';
import { doc, collection, query, where } from 'firebase/firestore';
import { useFirestore } from './provider';
import { useDoc } from './firestore/use-doc';
import { useCollection } from './firestore/use-collection';
import type { User, Conversation } from '@/lib/data';

export function useUserById(id: string | null | undefined) {
    const firestore = useFirestore();
    
    const docRef = useMemo(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'users', id);
    }, [firestore, id]);

    return useDoc<User>(docRef);
}

export function useUsers() {
    const firestore = useFirestore();

    const collectionRef = useMemo(() => {
        if (!firestore) return null;
        return collection(firestore, 'users');
    }, [firestore]);
    
    return useCollection<User>(collectionRef);
}

export function useConversations() {
    const firestore = useFirestore();

    const collectionRef = useMemo(() => {
        if (!firestore) return null;
        return collection(firestore, 'conversations');
    }, [firestore]);

    return useCollection<Conversation>(collectionRef);
}

export function useConversationById(id: string | null | undefined) {
    const firestore = useFirestore();

    const docRef = useMemo(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'conversations', id);
    }, [firestore, id]);
    
    return useDoc<Conversation>(docRef);
}
