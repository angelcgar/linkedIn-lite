import type { Message, Conversation } from '../types/index.js';

/**
 * Mock conversations database
 * In production, this would be fetched from a real database/API
 */
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['user-1', 'user-2'],
    unreadCount: 1,
    updatedAt: '2m ago',
  },
  {
    id: 'conv-2',
    participants: ['user-1', 'user-3'],
    unreadCount: 0,
    updatedAt: '1h ago',
  },
  {
    id: 'conv-3',
    participants: ['user-1', 'user-4'],
    unreadCount: 0,
    updatedAt: 'Yesterday',
  },
  {
    id: 'conv-4',
    participants: ['user-1', 'user-5'],
    unreadCount: 0,
    updatedAt: '2d ago',
  },
  {
    id: 'conv-5',
    participants: ['user-1', 'user-6'],
    unreadCount: 0,
    updatedAt: 'Mon',
  },
  {
    id: 'conv-6',
    participants: ['user-1', 'user-7'],
    unreadCount: 0,
    updatedAt: '10:27 AM',
  },
];

/**
 * Mock messages database
 * In production, this would be fetched from a real database/API
 */
export const messages: Message[] = [
  // Conversation 1 (Jane Doe)
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-2',
    content:
      "Looking forward to our meeting... I've prepared the slide deck for our presentation.",
    timestamp: '10:24 AM',
    isRead: false,
  },

  // Conversation 2 (John Smith)
  {
    id: 'msg-2',
    conversationId: 'conv-2',
    senderId: 'user-3',
    content: 'Thanks for the referral! I just finished the interview and it went well.',
    timestamp: '9:15 AM',
    isRead: true,
  },

  // Conversation 3 (Tech Corp Recruitment)
  {
    id: 'msg-3',
    conversationId: 'conv-3',
    senderId: 'user-4',
    content:
      "We've reviewed your application for the Senior Product Designer role and would like to schedule an interview.",
    timestamp: 'Yesterday',
    isRead: true,
  },

  // Conversation 4 (Sarah Wilson)
  {
    id: 'msg-4',
    conversationId: 'conv-4',
    senderId: 'user-5',
    content: 'Are you attending the networking event this Thursday in downtown?',
    timestamp: '2d ago',
    isRead: true,
  },

  // Conversation 5 (Michael Chen)
  {
    id: 'msg-5',
    conversationId: 'conv-5',
    senderId: 'user-6',
    content: "Hey! Let's sync up about the design systems project next week.",
    timestamp: 'Mon',
    isRead: true,
  },

  // Conversation 6 - Full chat example (Sarah Miller)
  {
    id: 'msg-6',
    conversationId: 'conv-6',
    senderId: 'user-7',
    content: 'Hi! I saw your portfolio. Would you be open to a quick chat about a role at our company?',
    timestamp: '10:24 AM',
    isRead: true,
  },
  {
    id: 'msg-7',
    conversationId: 'conv-6',
    senderId: 'user-1',
    content: "Hello Sarah, I'd love to! When works best for you?",
    timestamp: '10:26 AM',
    isRead: true,
  },
  {
    id: 'msg-8',
    conversationId: 'conv-6',
    senderId: 'user-7',
    content: "That's great! How about tomorrow at 2 PM? I can send over a calendar invite.",
    timestamp: '10:27 AM',
    isRead: true,
  },
];
