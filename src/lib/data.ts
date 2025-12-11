import { type ImagePlaceholder } from '@/lib/placeholder-images';

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

export interface Post {
    id: string;
    authorId: string;
    title: string;
    content: string;
    category: string;
    images: ImagePlaceholder[];
    likes: string[];
    comments: Comment[];
    createdAt: string;
}
  
export interface Comment {
    id: string;
    authorId: string;
    text: string;
    timestamp: string;
    likes: string[];
    replies: Comment[];
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
  userIds: string[];
  messages: Message[];
  // These fields are for denormalized display data
  user?: User; 
  lastMessage?: Message;
}

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    creditsPurchased: number;
    purchaseDate: string;
    transactionId: string;
}

export interface Connection {
    id: string;
    fromUserId: string;
    toUserId: string;
    status: 'liked' | 'requested' | 'connected' | 'blocked';
    createdAt: string;
}
