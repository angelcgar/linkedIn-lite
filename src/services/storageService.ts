import type { Post, User } from '../types/index.js';

/**
 * Storage Service
 *
 * Simula una API real con:
 * - Delays artificiales (500-1000ms)
 * - Manejo de errores aleatorios (10% probabilidad)
 * - Operaciones asíncronas con Promises
 * - Encapsulación completa de localStorage
 */

const STORAGE_KEYS = {
  POSTS: 'linkedin-lite-posts',
  USERS: 'linkedin-lite-users',
} as const;

const MIN_DELAY = 500;
const MAX_DELAY = 1000;
const ERROR_PROBABILITY = 0.1; // 10% de probabilidad de error

/**
 * Simula un delay de red artificial
 */
function simulateNetworkDelay(): Promise<void> {
  const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Simula posibles errores de red/servidor
 */
function simulateRandomError(): void {
  if (Math.random() < ERROR_PROBABILITY) {
    throw new Error('Simulated network error: Request failed');
  }
}

/**
 * Inicializa localStorage con datos por defecto si está vacío
 */
function initializeStorage(key: string, defaultData: any[]): void {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(defaultData));
  }
}

/**
 * Obtiene todos los posts
 */
export async function getPosts(): Promise<Post[]> {
  await simulateNetworkDelay();
  simulateRandomError();

  if (typeof window === 'undefined') {
    return [];
  }

  const data = localStorage.getItem(STORAGE_KEYS.POSTS);
  return data ? JSON.parse(data) : [];
}

/**
 * Obtiene un post por ID
 */
export async function getPostById(postId: string): Promise<Post | null> {
  await simulateNetworkDelay();
  simulateRandomError();

  const posts = await getPosts();
  return posts.find(post => post.id === postId) || null;
}

/**
 * Crea un nuevo post
 */
export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  await simulateNetworkDelay();
  simulateRandomError();

  if (typeof window === 'undefined') {
    throw new Error('Cannot create post on server side');
  }

  const posts = await getPosts();
  const newPost: Post = {
    ...post,
    id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  posts.unshift(newPost); // Agregar al inicio
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

  return newPost;
}

/**
 * Actualiza un post existente
 */
export async function updatePost(postId: string, updates: Partial<Post>): Promise<Post> {
  await simulateNetworkDelay();
  simulateRandomError();

  if (typeof window === 'undefined') {
    throw new Error('Cannot update post on server side');
  }

  const posts = await getPosts();
  const index = posts.findIndex(post => post.id === postId);

  if (index === -1) {
    throw new Error(`Post with id ${postId} not found`);
  }

  const updatedPost = { ...posts[index], ...updates };
  posts[index] = updatedPost;

  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

  return updatedPost;
}

/**
 * Elimina un post
 */
export async function deletePost(postId: string): Promise<void> {
  await simulateNetworkDelay();
  simulateRandomError();

  if (typeof window === 'undefined') {
    throw new Error('Cannot delete post on server side');
  }

  const posts = await getPosts();
  const filteredPosts = posts.filter(post => post.id !== postId);

  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(filteredPosts));
}

/**
 * Da like o quita like a un post
 */
export async function toggleLikePost(postId: string, increment: boolean = true): Promise<Post> {
  await simulateNetworkDelay();
  simulateRandomError();

  if (typeof window === 'undefined') {
    throw new Error('Cannot toggle like on server side');
  }

  const posts = await getPosts();
  const index = posts.findIndex(post => post.id === postId);

  if (index === -1) {
    throw new Error(`Post with id ${postId} not found`);
  }

  posts[index].likes += increment ? 1 : -1;
  posts[index].likes = Math.max(0, posts[index].likes); // No negativos

  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

  return posts[index];
}

/**
 * Inicializa el storage con datos de respaldo
 */
export function initializeStorageWithData(posts: Post[]): void {
  if (typeof window === 'undefined') return;

  // Solo inicializar si no hay datos
  const existing = localStorage.getItem(STORAGE_KEYS.POSTS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }
}

/**
 * Limpia todo el storage (útil para testing)
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEYS.POSTS);
  localStorage.removeItem(STORAGE_KEYS.USERS);
}
