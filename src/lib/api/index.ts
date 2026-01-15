import type { User, Post, ConnectionSuggestion, PostWithAuthor, ConversationWithUser, Message, Job } from '@/types/index.js';
import { users as usersData, posts as postsData } from '../data.js';
import { conversations as conversationsData, messages as messagesData } from '../messaging-data.js';
import { jobs as jobsData } from '../jobs-data.js';

/**
 * Simulated API latency (in milliseconds)
 * Set to 0 for instant responses, or increase to simulate network delay
 */
const API_LATENCY = 0;

/**
 * Utility to simulate async API calls
 */
async function simulateApiCall<T>(data: T, delay = API_LATENCY): Promise<T> {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return data;
}

/**
 * Get the currently authenticated user
 * In a real app, this would call: GET /api/users/me
 */
export async function getCurrentUser(): Promise<User | null> {
  const user = usersData.find((u) => u.isCurrentUser);
  return simulateApiCall(user || null);
}

/**
 * Get suggested connections for the current user
 * In a real app, this would call: GET /api/users/suggestions?limit={limit}
 */
export async function getUserSuggestions(limit = 3): Promise<ConnectionSuggestion[]> {
  const suggestions = usersData
    .filter((u) => !u.isCurrentUser)
    .slice(0, limit)
    .map(({ id, name, title, avatar }) => ({
      id,
      name,
      title,
      avatar,
    }));

  return simulateApiCall(suggestions);
}

/**
 * Get all posts with enriched author data
 * In a real app, this would call: GET /api/posts?include=author
 */
export async function getPosts(): Promise<PostWithAuthor[]> {
  const enrichedPosts: PostWithAuthor[] = postsData.map((post) => {
    const author = usersData.find((u) => u.id === post.userId);
    if (!author) {
      throw new Error(`Author not found for post ${post.id}`);
    }
    return {
      post,
      author,
    };
  });

  return simulateApiCall(enrichedPosts);
}

/**
 * Get a specific user by ID
 * In a real app, this would call: GET /api/users/{userId}
 */
export async function getUserById(userId: string): Promise<User | null> {
  const user = usersData.find((u) => u.id === userId);
  return simulateApiCall(user || null);
}

/**
 * Get posts by a specific user
 * In a real app, this would call: GET /api/posts?userId={userId}
 */
export async function getPostsByUser(userId: string): Promise<PostWithAuthor[]> {
  const allPosts = await getPosts();
  return allPosts.filter((p) => p.post.userId === userId);
}

/**
 * Get all conversations for the current user
 * In a real app, this would call: GET /api/conversations
 */
export async function getConversations(): Promise<ConversationWithUser[]> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  const enrichedConversations: ConversationWithUser[] = conversationsData.map((conversation) => {
    // Find the other participant (not the current user)
    const otherUserId = conversation.participants.find((id) => id !== currentUser.id);
    const otherUser = usersData.find((u) => u.id === otherUserId);

    if (!otherUser) {
      throw new Error(`User not found for conversation ${conversation.id}`);
    }

    // Get last message for this conversation
    const conversationMessages = messagesData.filter((m) => m.conversationId === conversation.id);
    const lastMessage = conversationMessages[conversationMessages.length - 1];

    return {
      conversation: {
        ...conversation,
        lastMessage,
      },
      otherUser,
    };
  });

  return simulateApiCall(enrichedConversations);
}

/**
 * Get all messages for a specific conversation
 * In a real app, this would call: GET /api/conversations/{conversationId}/messages
 */
export async function getMessagesByConversationId(conversationId: string): Promise<Message[]> {
  const conversationMessages = messagesData.filter((m) => m.conversationId === conversationId);
  return simulateApiCall(conversationMessages);
}

/**
 * Get a specific conversation by ID with enriched user data
 * In a real app, this would call: GET /api/conversations/{conversationId}
 */
export async function getConversationById(conversationId: string): Promise<ConversationWithUser | null> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const conversation = conversationsData.find((c) => c.id === conversationId);
  if (!conversation) {
    return null;
  }

  // Find the other participant (not the current user)
  const otherUserId = conversation.participants.find((id) => id !== currentUser.id);
  const otherUser = usersData.find((u) => u.id === otherUserId);

  if (!otherUser) {
    return null;
  }

  // Get last message for this conversation
  const conversationMessages = messagesData.filter((m) => m.conversationId === conversation.id);
  const lastMessage = conversationMessages[conversationMessages.length - 1];

  return simulateApiCall({
    conversation: {
      ...conversation,
      lastMessage,
    },
    otherUser,
  });
}

/**
 * Send a new message in a conversation
 * In a real app, this would call: POST /api/conversations/{conversationId}/messages
 */
export async function sendMessage(conversationId: string, content: string): Promise<Message> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }

  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderId: currentUser.id,
    content,
    timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    isRead: true,
  };

  // In a real app, this would persist to the backend
  messagesData.push(newMessage);

  return simulateApiCall(newMessage);
}

/**
 * Get all jobs with optional filtering
 * In a real app, this would call: GET /api/jobs?filters={filters}
 */
export async function getJobs(filters?: {
  query?: string;
  location?: string;
  isRemote?: boolean;
  type?: string;
  experienceLevel?: string;
}): Promise<Job[]> {
  let filteredJobs = [...jobsData];

  if (filters) {
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.name.toLowerCase().includes(query)
      );
    }

    if (filters.location) {
      const location = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.location.city.toLowerCase().includes(location) ||
          job.location.state?.toLowerCase().includes(location)
      );
    }

    if (filters.isRemote !== undefined) {
      filteredJobs = filteredJobs.filter((job) => job.location.isRemote === filters.isRemote);
    }

    if (filters.type) {
      filteredJobs = filteredJobs.filter((job) => job.type === filters.type);
    }

    if (filters.experienceLevel) {
      filteredJobs = filteredJobs.filter((job) => job.experienceLevel === filters.experienceLevel);
    }
  }

  return simulateApiCall(filteredJobs);
}

/**
 * Get a specific job by ID
 * In a real app, this would call: GET /api/jobs/{id}
 */
export async function getJobById(id: string): Promise<Job | null> {
  const job = jobsData.find((j) => j.id === id);
  return simulateApiCall(job || null);
}
