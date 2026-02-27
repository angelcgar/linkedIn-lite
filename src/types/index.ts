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
  email?: string; // Propiedad opcional para configuración de cuenta
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
  createdAt: number;
  likes: number;
  comments: number;
  image?: string | null;
  sharedPostId?: string;
  reactions: {
    like: number;
    clap: number;
    interesting: number;
  };
  userReaction: "like" | "clap" | "interesting" | null;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface CommentWithAuthor {
  comment: Comment;
  author: User;
}

export interface PostWithAuthor {
  post: Post;
  author: User;
  sharedPost?: PostWithAuthor; // Post original si este es un share
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

// Jobs types
export interface Company {
  id: string;
  name: string;
  logo: string;
  size?: string;
  industry?: string;
  description?: string;
}

export interface JobLocation {
  city: string;
  state?: string;
  country?: string;
  isRemote: boolean;
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type ExperienceLevel = 'Entry level' | 'Mid-Senior level' | 'Director' | 'Executive';

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: JobLocation;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  applicants: number;
  isActivelyHiring?: boolean;
  tags?: string[];
}

// Network types
export interface Invitation {
  id: string;
  user: User;
  mutualConnections?: number;
  sharedGroup?: string;
  timestamp: string;
}

export interface NetworkStats {
  connections: number;
  groups: number;
}

// Notification types
export type NotificationType =
  | 'profile_view'
  | 'post_like'
  | 'post_comment'
  | 'mention'
  | 'job_alert'
  | 'work_anniversary'
  | 'connection_request';

export interface Notification {
  id: string;
  type: NotificationType;
  userId?: string;
  user?: User;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  postTitle?: string;
  jobTitle?: string;
  companyName?: string;
}

// Saved Items Types
export interface SavedJob {
  id: string;
  job: Job;
  savedDate: string;
}

export interface SavedPost {
  id: string;
  post: PostWithAuthor;
  savedDate: string;
}

// Premium Types
export interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: 'eye' | 'mail' | 'star' | 'badge' | 'learning';
}
