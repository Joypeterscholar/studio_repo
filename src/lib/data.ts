import { placeholderImages, type ImagePlaceholder } from './placeholder-images';

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  image: ImagePlaceholder;
  location: string;
  isOnline: boolean;
  gallery: ImagePlaceholder[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
}

const findImage = (id: string) => {
  const img = placeholderImages.find(p => p.id === id);
  if (!img) {
    // Return a default/fallback image if not found
    return placeholderImages[0] || { id: 'fallback', description: 'Fallback', imageUrl: 'https://picsum.photos/seed/fallback/400/400', imageHint: 'person' };
  }
  return img;
};

export const users: User[] = [
  {
    id: '1',
    name: 'Alex',
    age: 28,
    bio: 'Software engineer by day, adventurer by weekend. Looking for someone to join me on spontaneous road trips and late-night coding sessions. I value honesty, a good sense of humor, and a love for tacos.',
    interests: ['Hiking', 'Coding', 'Photography', 'Indie Music', 'Tacos'],
    image: findImage('user-2'),
    location: 'San Francisco, CA',
    isOnline: true,
    gallery: [findImage('user-5'), findImage('user-6'), findImage('user-8')]
  },
  {
    id: '2',
    name: 'Brianna',
    age: 25,
    bio: 'Graphic designer with a passion for art, history, and my corgi, Winston. I love exploring museums, trying new cafes, and curling up with a good book. Searching for a kind soul who can make me laugh.',
    interests: ['Art', 'History', 'Dogs', 'Coffee', 'Reading'],
    image: findImage('user-1'),
    location: 'New York, NY',
    isOnline: false,
    gallery: [findImage('user-7'), findImage('user-9'), findImage('user-4')]
  },
  {
    id: '3',
    name: 'Carlos',
    age: 31,
    bio: 'Chef and foodie. My life revolves around creating and enjoying delicious meals. When I\'m not in the kitchen, I\'m probably at the gym, playing soccer, or planning my next culinary trip.',
    interests: ['Cooking', 'Fitness', 'Soccer', 'Travel', 'Wine'],
    image: findImage('user-5'),
    location: 'Miami, FL',
    isOnline: true,
    gallery: [findImage('user-2'), findImage('user-8'), findImage('user-11')]
  },
  {
    id: '4',
    name: 'Diana',
    age: 29,
    bio: 'Yoga instructor and mindfulness advocate. I find joy in the little things: a perfect sunrise, a warm cup of tea, a walk in the park. Seeking a partner who is emotionally intelligent and loves deep conversations.',
    interests: ['Yoga', 'Meditation', 'Nature', 'Tea', 'Philosophy'],
    image: findImage('user-4'),
    location: 'Austin, TX',
    isOnline: true,
    gallery: [findImage('user-1'), findImage('user-10'), findImage('user-6')]
  },
  {
    id: '5',
    name: 'Ethan',
    age: 27,
    bio: 'Musician and dreamer. I play guitar in a local band and spend my free time writing songs. I\'m a bit of an old soul who loves vinyl records, classic movies, and quiet nights in.',
    interests: ['Live Music', 'Guitar', 'Songwriting', 'Classic Films', 'Craft Beer'],
    image: findImage('user-8'),
    location: 'Nashville, TN',
    isOnline: false,
    gallery: [findImage('user-12'), findImage('user-2'), findImage('user-5')]
  },
  {
    id: '6',
    name: 'Fiona',
    age: 26,
    bio: 'Veterinarian in training. My world is filled with furry friends. If you\'re not a fan of dog hair on everything, we might not get along! I\'m compassionate, a little goofy, and fiercely loyal.',
    interests: ['Animals', 'Volunteering', 'Horseback Riding', 'Country Music', 'Baking'],
    image: findImage('user-11'),
    location: 'Denver, CO',
    isOnline: true,
    gallery: [findImage('user-3'), findImage('user-7'), findImage('user-10')]
  },
  {
    id: '7',
    name: 'Grace',
    age: 24,
    bio: 'Freelance writer and travel enthusiast. Just got back from a six-month backpacking trip through Southeast Asia. My ideal date involves getting lost in a new city. Tell me about your biggest adventure!',
    interests: ['Travel', 'Writing', 'Languages', 'Street Food', 'Backpacking'],
    image: findImage('user-7'),
    location: 'Chicago, IL',
    isOnline: true,
    gallery: [findImage('user-4'), findImage('user-10'), findImage('user-12')]
  },
   {
    id: '8',
    name: 'Henry',
    age: 33,
    bio: 'Architect who appreciates clean lines and a well-made old-fashioned. In my spare time, I enjoy sailing, reading biographies, and attempting to keep my houseplants alive. Looking for a confident and ambitious partner.',
    interests: ['Architecture', 'Sailing', 'Reading', 'Cocktails', 'Jazz'],
    image: findImage('user-3'),
    location: 'Boston, MA',
    isOnline: false,
    gallery: [findImage('user-5'), findImage('user-9'), findImage('user-11')]
  },
];

export const loggedInUser: User = {
  id: '0',
  name: 'Casey',
  age: 27,
  bio: 'Just a person who likes hiking and my dog. Trying to find someone to hang out with.',
  interests: 'Hiking, dogs, movies',
  image: findImage('user-9'),
  location: 'Portland, OR',
  isOnline: true,
  gallery: [findImage('user-9'), findImage('user-11'), findImage('user-6')]
};

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    userId: '1',
    messages: [
      { id: 'msg-1-1', senderId: '1', text: 'Hey! I saw you like indie music too. Seen any good shows lately?', timestamp: '2024-05-20T10:00:00Z', isRead: true },
      { id: 'msg-1-2', senderId: '0', text: 'Oh nice! I just saw The National last month, they were amazing. You?', timestamp: '2024-05-20T10:05:00Z', isRead: true },
      { id: 'msg-1-3', senderId: '1', text: 'No way, I\'m so jealous! I wanted to go to that show. I\'m seeing Bon Iver next week.', timestamp: '2024-05-20T10:06:00Z', isRead: false },
    ],
  },
  {
    id: 'conv-2',
    userId: '4',
    messages: [
      { id: 'msg-2-1', senderId: '4', text: 'Your profile made me smile :) A fellow tea lover!', timestamp: '2024-05-21T14:20:00Z', isRead: true },
      { id: 'msg-2-2', senderId: '0', text: 'Haha, it\'s the best, right? What\'s your go-to?', timestamp: '2024-05-21T14:30:00Z', isRead: true },
    ],
  },
  {
    id: 'conv-3',
    userId: '5',
    messages: [
      { id: 'msg-3-1', senderId: '5', text: 'Classic films... nice. Top 3, go!', timestamp: '2024-05-22T09:00:00Z', isRead: false },
    ],
  },
];

// Mock API functions
export const getUserById = (id: string): User | undefined => users.find(u => u.id === id) || (id === '0' ? loggedInUser : undefined);
export const getTodaysPicks = (): User[] => users.slice(0, 5);
export const getNearbyUsers = (): User[] => users.slice(5, 11);
export const getMatches = (): User[] => users.slice(0, 4);
export const getConversations = (): Conversation[] => conversations;
export const getConversationById = (id: string): Conversation | undefined => conversations.find(c => c.id === id);

// Add a function to get user details for conversations
export const getConversationsWithUserDetails = () => {
  return conversations.map(conv => {
    const user = getUserById(conv.userId);
    const lastMessage = conv.messages[conv.messages.length - 1];
    return {
      ...conv,
      user,
      lastMessage,
    };
  }).sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
};
