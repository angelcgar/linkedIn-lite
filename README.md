# LinkedIn-lite

A modern LinkedIn clone built with **Astro** and **Tailwind CSS** as a portfolio demo project.

## ✨ Features

- 🎨 **Clean UI** - Professional LinkedIn-inspired design
- 📱 **Responsive** - Mobile-first approach
- ⚡ **Fast** - Built with Astro for optimal performance
- 🎯 **Type-Safe** - Full TypeScript support
- 🏗️ **Scalable Architecture** - Ready for backend integration

## 🎯 Pages

- **Home Feed** (`/`) - Posts feed with likes and interactions
- **Profile** (`/profile`) - User profile with experience, skills, and about section

## 🚀 Quick Start

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed information about:
- API abstraction layer
- TypeScript types
- Data flow
- Backend integration guide

## 🎨 Design System

Custom CSS variables defined in `src/styles/global.css`:
- LinkedIn brand colors
- Neutral palette
- Semantic colors
- Consistent spacing

## 📁 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

## 🧞 Commands

| Command        | Action                                |
| :------------- | :------------------------------------ |
| `pnpm install` | Installs dependencies                 |
| `pnpm dev`     | Starts dev server at `localhost:4321` |
| `pnpm build`   | Build production site to `./dist/`    |
| `pnpm preview` | Preview production build locally      |

## 🎯 Next Steps

- [ ] Add more pages (Network, Jobs, Messages)
- [ ] Implement comment system
- [ ] Add search functionality
- [ ] Connect to real backend API
- [ ] Add authentication

## 📝 License

MIT - This is a demo project for portfolio purposes.
