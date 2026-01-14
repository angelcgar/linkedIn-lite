import type { User, Post, ConnectionSuggestion, PostWithAuthor } from '@/types/index.js';
import { users as usersData, posts as postsData } from '../data.js';
// import type { User } from '@/types/index.js';

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
