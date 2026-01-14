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
