# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog/website for David D. Smith at bosabosa.org, built with Next.js 12 and deployed on Netlify.

## Commands

- **Dev server**: `npm run dev` (runs on port 8000)
- **Build**: `npm run build`
- **Format**: `npm run format` (Prettier)
- **Deploy**: `npm run deploy` (pushes main to trigger Netlify CI/CD)
- **No test runner** is configured

## Code Style

- Prettier: no semicolons, no arrow function parens (`arrowParens: "avoid"`)
- Theme-UI JSX pragma: files using `sx` prop must have `/** @jsxImportSource theme-ui */` at top

## Architecture

### Content Pipeline

Blog posts live as Markdown files in `content/blog/` with YAML frontmatter (title, date, description, tags, draft). At build time:

1. `content.js` reads markdown files, parses frontmatter with gray-matter (Date values are converted to ISO strings for JSON serialization)
2. `@mdx-js/runtime` renders markdown as React components on the client
3. Posts are sorted by date (newest first) and enriched with prev/next navigation links
4. `getPostBySlug()` fetches all posts then filters — it's not a direct lookup

RSS feed is generated at build time via `feed.js`.

### Routing

- `/` → redirects to `/news`
- `/news` → blog listing (pages/news.js)
- `/news/[slug]` → individual post (pages/news/[slug].js), statically generated
- `/contact` → markdown page (pages/contact.md, rendered directly by Next.js MDX)
- Permanent redirects: `/b` → `/news`, `/b/:slug` → `/news/:slug` (configured in next.config.js)

### Styling

Uses Theme UI with a centralized theme in `theme.js`. Components use the `sx` prop for styling. Light/dark mode toggle is built into the header. Layout uses CSS Grid with responsive breakpoints defined in `components/layout.js`.

### Key Files

- `site.config.js` — site metadata (title, author, URL, postsPerPage)
- `theme.js` — Theme UI design tokens (colors, fonts, layout)
- `content.js` — content loading utilities (getPostSlugs, getAllPosts, getPostBySlug)
- `feed.js` — RSS feed generator
- `gtag.js` — Google Analytics wrapper
- `pages/_app.js` — app wrapper with analytics initialization and theme provider

### Adding a Blog Post

Create a new `.md` file in `content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DDTHH:MM:SS.000Z"
description: "Short description"
tags: ["tag1", "tag2"]
---
```

## Environment Variables

- `NEXT_PUBLIC_GA_ID` — Google Analytics tracking ID
- `NODE_VERSION=22` — pinned in `netlify.toml` for Netlify builds
