import {
  collection,
  doc,
  writeBatch,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { placeholderImages } from './placeholder-images';

// Helper to get a random item from an array
const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomItems = <T>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


// Sample data
const names = [
  'Olivia Chen', 'Liam Rodriguez', 'Ava Nguyen', 'Noah Kim', 'Isabella Garcia',
  'Ethan Martinez', 'Sophia Patel', 'Mason Williams', 'Mia Johnson', 'Lucas Brown'
];
const bios = [
  'Lover of adventure and spontaneous road trips. Looking for someone to explore the world with.',
  'Bookworm, coffee addict, and aspiring novelist. Let\'s discuss our favorite characters.',
  'Fitness enthusiast and professional chef. I can probably deadlift you and then cook you a great meal.',
  'Musician and artist. My life has a soundtrack, and I\'m looking for a duet partner.',
  'Tech geek with a heart of gold. I can fix your computer and steal your heart.',
];
const interests = ['Photography', 'Hiking', 'Cooking', 'Live Music', 'Traveling', 'Yoga', 'Art', 'Reading', 'Gaming'];
const locations = ['Lagos, NG', 'New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU'];
const postTitles = [
    'A beautiful day at the beach', 'Exploring the city nightlife', 'My latest culinary creation',
    'Sunset from the mountain top', 'Concert vibes'
];
const postContents = [
    'Had an amazing time soaking up the sun and enjoying the waves. Couldn\'t have asked for a better day.',
    'The city really comes alive at night. So many interesting sights and sounds.',
    'Spent the afternoon experimenting in the kitchen. Pretty proud of how this turned out!',
    'The view from the summit was absolutely breathtaking. Worth the climb!',
    'Nothing beats the energy of a live show. The band was incredible!'
];
const categories = ['Travel', 'Food', 'Lifestyle', 'Music', 'Nature'];

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

export async function seedDatabase(db: Firestore) {
  const batch = writeBatch(db);

  // --- Create Users ---
  const userIds: string[] = [];
  for (let i = 0; i < 10; i++) {
    const userId = `user_${i + 1}`;
    userIds.push(userId);
    const userRef = doc(db, 'users', userId);

    const galleryImages = getRandomItems(placeholderImages.filter(p => p.id.startsWith('user-')), 3);

    batch.set(userRef, {
      name: names[i % names.length],
      age: Math.floor(Math.random() * 20) + 22,
      bio: getRandomItem(bios),
      interests: getRandomItems(interests, Math.floor(Math.random() * 3) + 2),
      image: findImage(`user-${i+1}`),
      location: getRandomItem(locations),
      isOnline: Math.random() > 0.5,
      gallery: galleryImages,
    });
  }

  // --- Create Posts ---
  for (let i = 0; i < 5; i++) {
    const postId = `post_${i + 1}`;
    const postRef = doc(db, 'posts', postId);
    const authorId = getRandomItem(userIds);
    
    batch.set(postRef, {
      authorId: authorId,
      title: getRandomItem(postTitles),
      content: getRandomItem(postContents),
      category: getRandomItem(categories),
      images: [getRandomItem(placeholderImages.filter(p => p.id.startsWith('feed-')))],
      likes: getRandomItems(userIds, Math.floor(Math.random() * userIds.length)),
      comments: [],
      createdAt: serverTimestamp(),
    });
  }

  // --- Create Connections ---
  const statuses: ('liked' | 'requested' | 'connected' | 'blocked')[] = ['liked', 'requested', 'connected'];
  for (let i = 0; i < 15; i++) {
    const connectionRef = doc(collection(db, 'connections'));
    const [fromUserId, toUserId] = getRandomItems(userIds, 2);
    if(fromUserId === toUserId) continue; // no self-connections

    batch.set(connectionRef, {
      fromUserId,
      toUserId,
      status: getRandomItem(statuses),
      createdAt: serverTimestamp(),
      userIds: [fromUserId, toUserId],
    });
  }
  
  // --- Create Conversations & Messages ---
  const user1 = 'user_1';
  const user2 = 'user_2';
  const conversationId = [user1, user2].sort().join('_');
  const conversationRef = doc(db, 'conversations', conversationId);
  
  batch.set(conversationRef, {
    userIds: [user1, user2],
    lastMessage: {
        senderId: user2,
        text: 'Can\'t wait! See you then.',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        isRead: false
    }
  });

  const messagesRef = collection(db, `conversations/${conversationId}/messages`);
  const messages = [
      { senderId: user1, text: 'Hey! Are you free to meet up this weekend?', isRead: true, timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
      { senderId: user2, text: 'I\'d love that! How about Saturday afternoon?', isRead: true, timestamp: new Date(Date.now() - 4 * 60000).toISOString() },
      { senderId: user1, text: 'Perfect. There\'s a new coffee shop we could check out.', isRead: true, timestamp: new Date(Date.now() - 3 * 60000).toISOString() },
      { senderId: user2, text: 'Sounds great! I\'m looking forward to it.', isRead: true, timestamp: new Date(Date.now() - 2 * 60000).toISOString() },
      { senderId: user1, text: 'Can\'t wait! See you then.', isRead: false, timestamp: new Date(Date.now() - 1 * 60000).toISOString() },
  ];

  messages.forEach(msg => {
      const msgRef = doc(messagesRef);
      batch.set(msgRef, msg);
  });


  // Commit the batch
  await batch.commit();
}
