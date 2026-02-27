/**
 * Client-side initialization script
 *
 * Este script se ejecuta en el cliente para:
 * - Inicializar localStorage con datos por defecto
 * - Cargar y renderizar posts desde storageService
 * - Manejar hydration de components dinámicos
 * - Gestionar interacciones (likes, etc.)
 */

import { getPosts, initializeStorageWithData, toggleLikePost } from '../services/storageService';
import { posts as postsData } from '../lib/data';
import type { Post, User } from '../types/index';

/**
 * Renderiza un post como HTML
 */
function renderPost(post: Post, author: User): string {
    const imageHTML = post.image
        ? `<div class="px-4 pb-3">
                <img src="${post.image}" alt="Post content" class="w-full rounded-lg" />
            </div>`
        : "";

    return `
        <article class="bg-white rounded-lg border border-gray-200 mb-4 animate-fade-in">
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
                <div class="relative">
                    <button class="post-menu-btn text-gray-600 hover:bg-gray-100 rounded-full p-2 transition" data-post-id="${post.id}">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            ${post.content ? `<div class="px-4 pb-3">
                <p class="text-gray-900 text-sm leading-relaxed">${post.content}</p>
            </div>` : ''}

            ${imageHTML}

            <div class="px-4 py-2 flex items-center justify-between text-xs text-gray-600 border-t border-gray-200">
                <button class="hover:underline">
                    ${post.likes} Likes
                </button>
                <button class="hover:underline">
                    ${post.comments} Comments
                </button>
            </div>

            <div class="px-4 py-2 flex items-center justify-around border-t border-gray-200">
                <button class="post-like-btn flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition" data-post-id="${post.id}" data-likes="${post.likes}">
                    <svg class="like-icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                    </svg>
                    <span class="like-text text-sm font-semibold">Like</span>
                </button>
                <button class="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span class="text-sm font-semibold">Comment</span>
                </button>
                <button class="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                    <span class="text-sm font-semibold">Share</span>
                </button>
            </div>
        </article>
    `;
}

/**
 * Adjunta event listeners para likes
 */
export function attachLikeHandlers(): void {
    document.querySelectorAll(".post-like-btn").forEach((btn) => {
        const element = btn as HTMLElement;
        // Remover listener previo si existe
        const newBtn = element.cloneNode(true) as HTMLElement;
        element.parentNode?.replaceChild(newBtn, element);

        newBtn.addEventListener("click", async function (this: HTMLElement) {
            const postId = this.dataset.postId;
            if (!postId) return;

            const icon = this.querySelector(".like-icon");
            const text = this.querySelector(".like-text");
            const isLiked = this.classList.contains("text-blue-600");

            // UI optimista - actualizar inmediatamente
            if (isLiked) {
                this.classList.remove("text-blue-600");
                this.classList.add("text-gray-600");
                icon?.setAttribute("fill", "none");
                if (text) text.textContent = "Like";
            } else {
                this.classList.remove("text-gray-600");
                this.classList.add("text-blue-600");
                icon?.setAttribute("fill", "currentColor");
                if (text) text.textContent = "Liked";
            }

            // Llamada al storageService (con delay simulado)
            try {
                await toggleLikePost(postId, !isLiked);
            } catch (error) {
                console.error("Failed to toggle like:", error);
                // Revertir cambio optimista en caso de error
                if (isLiked) {
                    this.classList.remove("text-gray-600");
                    this.classList.add("text-blue-600");
                    icon?.setAttribute("fill", "currentColor");
                    if (text) text.textContent = "Liked";
                } else {
                    this.classList.remove("text-blue-600");
                    this.classList.add("text-gray-600");
                    icon?.setAttribute("fill", "none");
                    if (text) text.textContent = "Like";
                }
            }
        });
    });
}

/**
 * Carga y renderiza posts desde storage
 */
export async function loadAndRenderPosts(
    container: HTMLElement,
    users: User[]
): Promise<void> {
    try {
        // Inicializar storage con datos por defecto si está vacío
        initializeStorageWithData(postsData);

        // Cargar posts desde storage (con delay simulado)
        const posts = await getPosts();

        // Renderizar posts
        const postsHTML = posts.map(post => {
            const author = users.find(u => u.id === post.userId);
            if (!author) {
                console.warn(`Author not found for post ${post.id}`);
                return '';
            }
            return renderPost(post, author);
        }).join('');

        container.innerHTML = postsHTML;

        // Adjuntar event handlers
        attachLikeHandlers();

    } catch (error) {
        console.error('Error loading posts:', error);
        container.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p class="text-red-800 font-semibold mb-2">Failed to load posts</p>
                <p class="text-red-600 text-sm mb-3">${error instanceof Error ? error.message : 'Unknown error'}</p>
                <button
                    onclick="window.location.reload()"
                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                    Reload Page
                </button>
            </div>
        `;
    }
}
