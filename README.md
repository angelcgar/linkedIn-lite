# LinkedIn Lite

> A modern, production-ready LinkedIn clone built with Astro, TypeScript, and vanilla JavaScript. Features dynamic feed ordering, interactive reactions, editable profiles, and dark mode—all without external frameworks.

[![Astro](https://img.shields.io/badge/Astro-4.0-FF5D01?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

## 🎯 Overview

LinkedIn Lite is a fully functional social media MVP designed to showcase modern web development practices. Built entirely with **Astro** and **vanilla JavaScript**, it demonstrates how to create a professional, scalable application without relying on heavy frameworks like React or Vue.

**Live Demo:** [Coming Soon]

## ✨ Key Features

### 🔄 Dynamic Feed System
- **Smart Ordering**: Sort posts by most recent or most popular (total reactions)
- **Interactive Reactions**: Three reaction types (👍 Like, 👏 Applause, 💡 Interesting)
- **Real-time Updates**: Instant UI updates without page reloads
- **Persistent State**: All interactions saved to localStorage

### 👤 Editable Profile
- **Bio Management**: Edit your biography in real-time
- **Skills Editor**: Add, remove, and update skills dynamically
- **Experience Timeline**: Manage work experience with full CRUD operations
- **Instant Persistence**: Changes saved immediately to localStorage

### 🌙 Professional Dark Mode
- **System Preference Detection**: Automatically detects user's theme preference
- **Manual Toggle**: Switch themes with a single click
- **Smooth Transitions**: 200ms CSS transitions for seamless theme changes
- **Persistent Choice**: Theme preference saved across sessions

### 📱 Fully Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layout for medium screens
- **Desktop Experience**: Full-featured layout on large screens
- **No Media Query Overload**: Clean, maintainable responsive code

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/linkedin-lite.git
cd linkedin-lite

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4321` to see the app in action.

## 🏗️ Architecture

### Tech Stack

- **Framework**: [Astro 4.0](https://astro.build) - Zero-JS by default, perfect for performance
- **Styling**: [TailwindCSS 3.0](https://tailwindcss.com) - Utility-first CSS framework
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/) - Type safety for data structures
- **Client-Side**: Vanilla JavaScript - No framework dependencies

### Project Structure

```
linkedin-lite/
├── src/
│   ├── components/          # Astro components
│   │   ├── Navbar.astro
│   │   ├── ProfileCard.astro
│   │   ├── ExperienceCard.astro
│   │   ├── ThemeToggle.astro
│   │   └── ...
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro
│   ├── pages/               # File-based routing
│   │   ├── index.astro      # Home feed
│   │   ├── profile.astro
│   │   └── ...
│   ├── lib/                 # Business logic
│   │   ├── feed/            # Feed management
│   │   │   ├── feed.js
│   │   │   ├── reactions.js
│   │   │   └── storageService.js
│   │   ├── profile/         # Profile management
│   │   │   ├── profile.js
│   │   │   └── storageService.js
│   │   ├── theme/           # Theme management
│   │   │   └── theme.js
│   │   ├── api/             # API abstraction layer
│   │   └── data.ts          # Mock data
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   └── styles/              # Global styles
│       └── global.css
├── public/                  # Static assets
└── package.json
```

### Design Decisions

#### Why localStorage Instead of a Backend?

This project uses **localStorage** as a persistence layer to demonstrate:

1. **Client-side state management** without external dependencies
2. **Immediate feedback** - no network latency
3. **Offline-first** capabilities
4. **Easy migration path** to a real backend (see Future Improvements)

The architecture is designed with **separation of concerns**:
- `storageService.js` modules encapsulate all localStorage logic
- Swapping to a REST API or GraphQL would only require updating these service files
- Business logic remains unchanged

#### Modular JavaScript Architecture

Instead of using a framework, the codebase is organized into focused modules:

- **`feed.js`**: Rendering and sorting logic
- **`reactions.js`**: Reaction handling and animations
- **`profile.js`**: Profile editing and state management
- **`storageService.js`**: Data persistence abstraction

This approach provides:
- ✅ Clear separation of concerns
- ✅ Easy testing and debugging
- ✅ No build-time complexity
- ✅ Better performance (no framework overhead)

## 🎨 Features Deep Dive

### Feed System

The feed supports two sorting modes:

1. **Most Recent**: Posts sorted by `createdAt` timestamp (descending)
2. **Most Popular**: Posts sorted by total reactions (like + clap + interesting)

**Implementation**:
```javascript
// src/lib/feed/feed.js
export function sortPosts(posts, sortBy = 'recent') {
  if (sortBy === 'recent') {
    return posts.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortBy === 'popular') {
    const totalA = getTotalReactions(a);
    const totalB = getTotalReactions(b);
    return totalB - totalA;
  }
}
```

### Reaction System

Each post supports three reaction types with the following rules:

- ✅ Users can react once per post
- ✅ Clicking the same reaction removes it
- ✅ Clicking a different reaction switches to it
- ✅ Reaction counts update in real-time
- ✅ Smooth animations on interaction

**Data Structure**:
```typescript
interface Post {
  id: string;
  reactions: {
    like: number;
    clap: number;
    interesting: number;
  };
  userReaction: "like" | "clap" | "interesting" | null;
}
```

### Profile Editing

The profile system supports:

- **Bio**: Rich text editing with save/cancel
- **Skills**: Comma-separated input with dynamic rendering
- **Experience**: Full CRUD with timeline visualization

All changes are persisted immediately to localStorage and reflected in the UI without page reloads.

### Dark Mode

Theme implementation uses:

1. **CSS Variables**: All colors defined as custom properties
2. **HTML Class Toggle**: `.dark` class on `<html>` element
3. **localStorage Persistence**: Theme choice saved as `linkedin-lite-theme`
4. **System Preference Detection**: Falls back to `prefers-color-scheme`

## 🎯 Future Improvements

This project is designed as an MVP with clear paths for enhancement:

### Backend Integration
- [ ] Replace localStorage with REST API
- [ ] Add authentication (JWT, OAuth)
- [ ] Implement real-time updates (WebSockets)
- [ ] Add image upload functionality

### Features
- [ ] Comment system on posts
- [ ] User search and discovery
- [ ] Messaging system
- [ ] Notifications
- [ ] Job board
- [ ] Network/connections management

### Technical
- [ ] Add unit tests (Vitest)
- [ ] E2E testing (Playwright)
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] SEO optimization

## 🧪 Development

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for Astro + TypeScript
- **Prettier**: Consistent formatting

### Best Practices

- ✅ Semantic HTML
- ✅ Accessible components (ARIA labels)
- ✅ Mobile-first responsive design
- ✅ Progressive enhancement
- ✅ Clean, documented code

## 📝 License

MIT © 2024 - This is a portfolio demonstration project.

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

---

**Built with ❤️ using Astro, TypeScript, and vanilla JavaScript**
