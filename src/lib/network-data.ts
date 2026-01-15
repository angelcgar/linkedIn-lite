import type { Invitation, User, NetworkStats } from '@/types/index.js';

/**
 * Mock Network Data
 * In a real application, this would come from a backend API
 */

// Additional users for connection suggestions
export const suggestedUsers: User[] = [
  {
    id: 'user-10',
    name: 'Jane Doe',
    title: 'Senior Product Designer at Figma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    connections: 892,
    isCurrentUser: false,
  },
  {
    id: 'user-11',
    name: 'Alex Smith',
    title: 'Engineering Lead at Stripe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexS',
    connections: 1243,
    isCurrentUser: false,
  },
  {
    id: 'user-12',
    name: 'Sarah Chen',
    title: 'AI Research Scientist at OpenAI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahC',
    connections: 567,
    isCurrentUser: false,
  },
  {
    id: 'user-13',
    name: 'Michael Rossi',
    title: 'Growth Lead at Uber',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    connections: 2103,
    isCurrentUser: false,
  },
  {
    id: 'user-14',
    name: 'Elena Vance',
    title: 'Staff Software Engineer at Meta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    connections: 1456,
    isCurrentUser: false,
  },
  {
    id: 'user-15',
    name: 'David Kim',
    title: 'UX Research at Airbnb',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    connections: 823,
    isCurrentUser: false,
  },
];

export const invitations: Invitation[] = [
  {
    id: 'inv-1',
    user: {
      id: 'user-10',
      name: 'Jane Doe',
      title: 'Senior Product Designer at Figma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      connections: 892,
      isCurrentUser: false,
    },
    mutualConnections: 2,
    timestamp: '2d ago',
  },
  {
    id: 'inv-2',
    user: {
      id: 'user-11',
      name: 'Alex Smith',
      title: 'Engineering Lead at Stripe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexS',
      connections: 1243,
      isCurrentUser: false,
    },
    sharedGroup: 'Tech Founders',
    timestamp: '3d ago',
  },
];

export const networkStats: NetworkStats = {
  connections: 532,
  groups: 12,
};
