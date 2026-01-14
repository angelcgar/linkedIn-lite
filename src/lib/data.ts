import type { User, Post } from '../types/index.js';

/**
 * Mock user database
 * In production, this would be fetched from a real database/API
 */
export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    title: 'Product Designer at TechCorp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    connections: 500,
    isCurrentUser: true,
    location: 'San Francisco, CA',
    about:
      'Passionate Product Designer with 5+ years of experience in creating user-centric digital experiences. I specialize in design systems, mobile-first strategies, and bridging the gap between design and engineering.',
    experience: [
      {
        id: 'exp-1',
        title: 'Product Designer',
        company: 'TechCorp',
        employmentType: 'Full-time',
        startDate: 'Jan 2021',
        endDate: 'Present',
        duration: '3 yrs 5 mos',
        location: 'San Francisco, California',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
      },
      {
        id: 'exp-2',
        title: 'UX Designer',
        company: 'Designly',
        employmentType: 'Full-time',
        startDate: 'Aug 2018',
        endDate: 'Dec 2020',
        duration: '2 yrs 5 mos',
        location: 'Remote',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DG',
      },
    ],
    skills: ['UI/UX Design', 'Design Systems', 'Figma', 'Prototyping', 'User Research', 'Mobile Design'],
  },
  {
    id: 'user-2',
    name: 'Sarah Miller',
    title: 'UX Manager at Designly',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    connections: 753,
    isCurrentUser: false,
    isOnline: true,
    lastSeen: 'Active now',
  },
  {
    id: 'user-3',
    name: 'Jordan Lee',
    title: 'Lead Dev at Webflow',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    connections: 621,
    isCurrentUser: false,
    isOnline: false,
    lastSeen: '1h ago',
  },
  {
    id: 'user-4',
    name: 'Michael Chen',
    title: 'CTO at TechFlow',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    connections: 1842,
    isCurrentUser: false,
    isOnline: false,
    lastSeen: 'Yesterday',
  },
  {
    id: 'user-5',
    name: 'Emily Roberts',
    title: 'Frontend Engineer at Stripe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    connections: 934,
    isCurrentUser: false,
    isOnline: false,
    lastSeen: '2d ago',
  },
  {
    id: 'user-6',
    name: 'David Kim',
    title: 'Product Manager at Google',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    connections: 2156,
    isCurrentUser: false,
    isOnline: false,
    lastSeen: '2h ago',
  },
  {
    id: 'user-7',
    name: 'Sarah Miller',
    title: 'Senior Recruiter at TechCorp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM',
    connections: 1240,
    isCurrentUser: false,
    isOnline: true,
    lastSeen: 'Active now',
  },
];

/**
 * Mock posts database
 * In production, this would be fetched from a real database/API
 */
export const posts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-2',
    content:
      "Excited to share my latest project on minimalist interfaces. We focused on reducing cognitive load while maintaining functionality. What's your take on minimal UI? 🚀",
    timestamp: '2h',
    likes: 124,
    comments: 18,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop',
  },
  {
    id: 'post-2',
    userId: 'user-4',
    content:
      "Always proud of the team at TechFlow. We just hit a major milestone in our backend scalability project! Grateful for everyone's hard work.",
    timestamp: '5h',
    likes: 89,
    comments: 4,
    image: null,
  },
  {
    id: 'post-3',
    userId: 'user-5',
    content:
      'Just published a new article about React Server Components and their impact on modern web architecture. Link in comments! 📝',
    timestamp: '1d',
    likes: 267,
    comments: 32,
    image: null,
  },
  {
    id: 'post-4',
    userId: 'user-6',
    content:
      "Hiring! We're looking for a Senior Product Designer to join our team. Remote-friendly, competitive salary, and amazing benefits. DM me if interested! 💼",
    timestamp: '2d',
    likes: 421,
    comments: 56,
    image: null,
  },
];
