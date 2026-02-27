const STORAGE_KEY = 'linkedin-lite-posts';

export function getPosts() {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePosts(posts) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function updatePost(postId, updates) {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === postId);
  
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  savePosts(posts);
  
  return posts[index];
}

export function initializePosts(defaultPosts) {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const postsWithDefaults = defaultPosts.map(post => ({
      ...post,
      createdAt: post.createdAt || Date.now(),
      reactions: post.reactions || { like: 0, clap: 0, interesting: 0 },
      userReaction: post.userReaction || null
    }));
    savePosts(postsWithDefaults);
  } else {
    const posts = JSON.parse(existing);
    const updatedPosts = posts.map(post => ({
      ...post,
      createdAt: post.createdAt || Date.now(),
      reactions: post.reactions || { like: 0, clap: 0, interesting: 0 },
      userReaction: post.userReaction || null
    }));
    savePosts(updatedPosts);
  }
}
