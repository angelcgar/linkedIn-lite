import type { PostWithAuthor } from '../types/index.js';

/**
 * Utilidad base para búsqueda de posts
 * Realiza coincidencia simple de texto en contenido y nombre de autor
 */
export function searchPosts(posts: PostWithAuthor[], query: string): PostWithAuthor[] {
  if (!query.trim()) {
    return posts;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return posts.filter((postWithAuthor) => {
    const { post, author } = postWithAuthor;

    // Buscar en contenido del post
    const contentMatch = post.content.toLowerCase().includes(normalizedQuery);

    // Buscar en nombre del autor
    const authorMatch = author.name.toLowerCase().includes(normalizedQuery);

    // Buscar en título del autor (empresa/rol)
    const titleMatch = author.title.toLowerCase().includes(normalizedQuery);

    return contentMatch || authorMatch || titleMatch;
  });
}

/**
 * Versión extensible de búsqueda con opciones adicionales
 * Permite filtrar por tipo de coincidencia y ordenamiento
 */
export interface SearchOptions {
  matchType?: 'any' | 'content' | 'author' | 'title';
  sortBy?: 'relevance' | 'date' | 'engagement';
  limit?: number;
}

export function searchPostsExtended(
  posts: PostWithAuthor[],
  query: string,
  options: SearchOptions = {}
): PostWithAuthor[] {
  if (!query.trim()) {
    return posts;
  }

  const { matchType = 'any', sortBy = 'relevance', limit } = options;
  const normalizedQuery = query.toLowerCase().trim();

  // Filtrar según tipo de coincidencia
  let filtered = posts.filter((postWithAuthor) => {
    const { post, author } = postWithAuthor;

    const contentMatch = post.content.toLowerCase().includes(normalizedQuery);
    const authorMatch = author.name.toLowerCase().includes(normalizedQuery);
    const titleMatch = author.title.toLowerCase().includes(normalizedQuery);

    switch (matchType) {
      case 'content':
        return contentMatch;
      case 'author':
        return authorMatch;
      case 'title':
        return titleMatch;
      case 'any':
      default:
        return contentMatch || authorMatch || titleMatch;
    }
  });

  // Ordenar resultados
  if (sortBy === 'engagement') {
    filtered.sort((a, b) => {
      const engagementA = a.post.likes + a.post.comments;
      const engagementB = b.post.likes + b.post.comments;
      return engagementB - engagementA;
    });
  } else if (sortBy === 'relevance') {
    // Ordenar por relevancia (priorizar coincidencias en autor sobre contenido)
    filtered.sort((a, b) => {
      const authorMatchA = a.author.name.toLowerCase().includes(normalizedQuery);
      const authorMatchB = b.author.name.toLowerCase().includes(normalizedQuery);

      if (authorMatchA && !authorMatchB) return -1;
      if (!authorMatchA && authorMatchB) return 1;

      return 0;
    });
  }
  // sortBy 'date' mantiene el orden original (más reciente primero)

  // Aplicar límite si existe
  if (limit && limit > 0) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}
