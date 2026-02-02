# lucaschristian.com

Personal website and security blog built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## 🚀 Features

- ⚡ Fast static site generation with Astro
- 🎨 Modern dark theme with terminal aesthetics
- 📝 Blog powered by Astro Content Collections
- 🎯 Responsive design with Tailwind CSS
- 🔒 Security-focused content and writeups
- 🚢 Automated deployment to GitHub Pages

## 🛠️ Tech Stack

- **Framework:** Astro 4.x
- **Styling:** Tailwind CSS
- **Fonts:** Inter, JetBrains Mono
- **Deployment:** GitHub Pages (via GitHub Actions)

## 📦 Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable Astro components
│   ├── content/     # Blog posts (Markdown)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route pages
│   └── styles/      # Global styles
└── package.json
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Adding Blog Posts

Create a new `.md` file in `src/content/blog/` with the following frontmatter:

```yaml
---
title: "Post Title"
description: "Post description"
pubDate: 2024-01-01
tags: ["tag1", "tag2"]
---
```

## 🌐 Deployment

The site automatically deploys to GitHub Pages when pushing to the `main` branch. Ensure GitHub Pages is configured to use GitHub Actions as the source.

## 📄 License

© 2026 Lucas Christian
