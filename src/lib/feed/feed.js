import { getPosts } from './storageService.js';
import { getTotalReactions, handleReaction, animateReaction } from './reactions.js';

export function sortPosts(posts, sortBy = 'recent') {
  const sorted = [...posts];
  
  if (sortBy === 'recent') {
    return sorted.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortBy === 'popular') {
    return sorted.sort((a, b) => {
      const totalA = getTotalReactions(a);
      const totalB = getTotalReactions(b);
      return totalB - totalA;
    });
  }
  
  return sorted;
}

export function renderPost(post, author) {
  const totalReactions = getTotalReactions(post);
  const imageHTML = post.image
    ? `<div class="px-4 pb-3">
        <img src="${post.image}" alt="Post content" class="w-full rounded-lg" />
      </div>`
    : "";

  const reactionButtons = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'clap', emoji: '👏', label: 'Aplauso' },
    { type: 'interesting', emoji: '💡', label: 'Interesante' }
  ];

  const reactionsHTML = reactionButtons.map(({ type, emoji, label }) => {
    const count = post.reactions[type];
    const isActive = post.userReaction === type;
    const activeClass = isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600';
    
    return `
      <button 
        class="reaction-btn flex-1 flex items-center justify-center gap-2 py-2 ${activeClass} hover:bg-gray-50 rounded transition"
        data-post-id="${post.id}"
        data-reaction-type="${type}"
      >
        <span class="reaction-emoji text-xl">${emoji}</span>
        <span class="text-sm font-semibold">${label}</span>
        ${count > 0 ? `<span class="text-xs">(${count})</span>` : ''}
      </button>
    `;
  }).join('');

  return `
    <article class="post-item bg-white rounded-lg border border-gray-200 mb-4" data-post-id="${post.id}">
      <div class="p-4 flex items-start justify-between">
        <div class="flex items-start gap-3">
          <a href="/users/${author.id}">
            <img
              src="${author.avatar}"
              alt="${author.name}"
              class="w-12 h-12 rounded-full hover:opacity-90 transition"
            />
          </a>
          <div>
            <a href="/users/${author.id}" class="hover:underline">
              <h3 class="font-semibold text-gray-900">${author.name}</h3>
            </a>
            <p class="text-xs text-gray-600">${author.title}</p>
            <p class="text-xs text-gray-500 mt-0.5">${post.timestamp}</p>
          </div>
        </div>
      </div>

      ${post.content ? `<div class="px-4 pb-3">
        <p class="text-gray-900 text-sm leading-relaxed">${post.content}</p>
      </div>` : ''}

      ${imageHTML}

      ${totalReactions > 0 ? `
        <div class="px-4 py-2 flex items-center justify-between text-xs text-gray-600 border-t border-gray-200">
          <span>${totalReactions} ${totalReactions === 1 ? 'reacción' : 'reacciones'}</span>
          <span>${post.comments} ${post.comments === 1 ? 'comentario' : 'comentarios'}</span>
        </div>
      ` : ''}

      <div class="px-4 py-2 flex items-center justify-around border-t border-gray-200">
        ${reactionsHTML}
      </div>
    </article>
  `;
}

export function renderFeed(users, sortBy = 'recent') {
  const posts = getPosts();
  const sortedPosts = sortPosts(posts, sortBy);
  
  const container = document.getElementById('posts-container');
  if (!container) return;

  const postsHTML = sortedPosts.map(post => {
    const author = users.find(u => u.id === post.userId);
    if (!author) return '';
    return renderPost(post, author);
  }).join('');

  container.style.opacity = '0';
  
  setTimeout(() => {
    container.innerHTML = postsHTML;
    attachReactionHandlers();
    
    requestAnimationFrame(() => {
      container.style.transition = 'opacity 300ms ease-in-out';
      container.style.opacity = '1';
    });
  }, 150);
}

export function attachReactionHandlers() {
  document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const postId = this.dataset.postId;
      const reactionType = this.dataset.reactionType;
      
      const emojiElement = this.querySelector('.reaction-emoji');
      if (emojiElement) {
        animateReaction(emojiElement);
      }
      
      handleReaction(postId, reactionType);
      
      const currentSort = document.getElementById('feed-sort-select')?.value || 'recent';
      const users = window.__USERS_DATA__ || [];
      
      setTimeout(() => {
        renderFeed(users, currentSort);
      }, 100);
    });
  });
}
