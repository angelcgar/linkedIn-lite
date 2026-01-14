# LinkedIn-lite Architecture

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.astro
│   ├── ProfileSidebar.astro
│   ├── RightSidebar.astro
│   └── Post.astro
├── data/               # Legacy JSON files (deprecated - use lib/data.ts)
│   ├── users.json
│   └── posts.json
├── layouts/            # Page layouts
│   └── Layout.astro
├── lib/                # Business logic & utilities
│   ├── api/           # API abstraction layer
│   │   └── index.ts   # Simulated API functions
│   └── data.ts        # Mock database (TypeScript)
├── pages/             # Route pages
│   └── index.astro
├── types/             # TypeScript type definitions
│   └── index.ts      # Domain types (User, Post, etc.)
└── styles/
    └── global.css
```

## 🏗️ Architecture Principles

### 1. **API Abstraction Layer** (`src/lib/api/`)
All data access goes through dedicated API functions:
- `getCurrentUser()` - Get authenticated user
- `getUserSuggestions(limit)` - Get connection suggestions
- `getPosts()` - Get feed posts with author data
- `getUserById(userId)` - Get specific user
- `getPostsByUser(userId)` - Get user's posts

**Current State:** These functions read from `src/lib/data.ts` (TypeScript mock data)
**Future State:** Will call real backend endpoints (just change the implementation)

### 2. **Mock Data Layer** (`src/lib/data.ts`)
Centralized mock database written in TypeScript:
- Fully typed with domain interfaces
- Easy to modify and extend
- Acts as a temporary data source until backend is ready
- **Replaces JSON files** for better type safety and build compatibility

### 3. **TypeScript Types** (`src/types/`)
All domain objects have explicit TypeScript interfaces:
- `User` - User profile data
- `Post` - Post content and metadata
- `PostWithAuthor` - Enriched post with author details
- `ConnectionSuggestion` - Suggested connection data
- `ApiResponse<T>` - Generic API response wrapper (for future use)

### 4. **Component Props**
All components use typed props imported from `src/types/`:
```ts
import type { User } from '../types/index.js';

interface Props {
  user: User;
}
```

### 5. **Data Flow**
```
TypeScript Mock Data (lib/data.ts) → API Layer → Page/Component → UI
```

When backend is ready:
```
Backend API → API Layer → Page/Component → UI
              ↑ (only this changes)
```

## 🔄 Migrating to Real Backend

To integrate with a real backend, update **only** `src/lib/api/index.ts`:

### Before (Mock):
```ts
import { users, posts } from '../data.js';

export async function getCurrentUser(): Promise<User | null> {
  const user = users.find((u) => u.isCurrentUser);
  return simulateApiCall(user || null);
}
```

### After (Real API):
```ts
export async function getCurrentUser(): Promise<User | null> {
  const response = await fetch('/api/users/me');
  if (!response.ok) return null;
  return response.json();
}
```

**No changes needed in components or pages!**

## 🎯 Key Benefits

1. **Clean Separation** - UI doesn't know where data comes from
2. **Type Safety** - Catch errors at compile time
3. **Easy Testing** - Mock API layer for tests
4. **Future-Proof** - Backend integration is just swapping implementations
5. **Professional** - Follows industry best practices

## 🚀 Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## 📝 Notes

- All API functions are `async` to simulate real network calls
- `API_LATENCY` constant in `api/index.ts` can simulate network delay
- Components only import types, never raw data files
- Error handling is included (e.g., missing user/author checks)
