import { getPosts, updatePost } from './storageService.js';

export function handleReaction(postId, reactionType) {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  
  if (!post) return null;
  
  const currentReaction = post.userReaction;
  const newReactions = { ...post.reactions };
  
  if (currentReaction === reactionType) {
    newReactions[reactionType]--;
    return updatePost(postId, {
      reactions: newReactions,
      userReaction: null
    });
  }
  
  if (currentReaction) {
    newReactions[currentReaction]--;
  }
  
  newReactions[reactionType]++;
  
  return updatePost(postId, {
    reactions: newReactions,
    userReaction: reactionType
  });
}

export function getTotalReactions(post) {
  return post.reactions.like + post.reactions.clap + post.reactions.interesting;
}

export function animateReaction(element) {
  element.classList.add('reaction-animate');
  setTimeout(() => {
    element.classList.remove('reaction-animate');
  }, 200);
}
