/**
 * Core domain types for LinkedIn-lite
 * These types mirror what a real backend API would return
 */

export interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
  connections: number;
  isCurrentUser?: boolean;
  location?: string;
  about?: string;
  experience?: Experience[];
  skills?: string[];
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  startDate: string;
  endDate?: string;
  duration: string;
  location?: string;
  logo?: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string | null;
}

export interface PostWithAuthor {
  post: Post;
  author: User;
}

export interface ConnectionSuggestion {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

// API Response types (for future backend integration)
export interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Messaging types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface ConversationWithUser {
  conversation: Conversation;
  otherUser: User;
}
