import type { User } from '../types/index.js';

/**
 * Fetch users from randomuser.me API
 * Maps external API response to our internal User type
 */
export async function fetchRandomUsers(count = 10): Promise<User[]> {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${count}&inc=name,email,picture,location,login&nat=us,gb,ca`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch random users');
    }

    const data = await response.json();

    return data.results.map((user: any, index: number) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      title: generateJobTitle(),
      avatar: user.picture.large,
      connections: Math.floor(Math.random() * 900) + 100,
      location: `${user.location.city}, ${user.location.state}`,
      isOnline: Math.random() > 0.5,
      lastSeen: generateLastSeen(),
      isCurrentUser: index === 0, // First user is current user
    }));
  } catch (error) {
    console.error('Error fetching random users:', error);
    // Fallback to empty array or throw
    return [];
  }
}

/**
 * Generate realistic job titles
 */
function generateJobTitle(): string {
  const titles = [
    'Product Designer at TechCorp',
    'Senior Software Engineer at Google',
    'UX Manager at Designly',
    'Frontend Developer at Stripe',
    'Product Manager at Meta',
    'Lead Designer at Figma',
    'Full Stack Developer at Netflix',
    'Data Scientist at Amazon',
    'DevOps Engineer at Microsoft',
    'UI Designer at Adobe',
    'Backend Engineer at Airbnb',
    'Marketing Manager at Salesforce',
    'CTO at StartupCo',
    'iOS Developer at Apple',
    'QA Engineer at Tesla',
  ];

  return titles[Math.floor(Math.random() * titles.length)];
}

/**
 * Generate realistic "last seen" timestamps
 */
function generateLastSeen(): string {
  const options = [
    'Just now',
    '5m ago',
    '30m ago',
    '1h ago',
    '2h ago',
    'Yesterday',
    '2d ago',
  ];

  return options[Math.floor(Math.random() * options.length)];
}
