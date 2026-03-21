# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog/website for David D. Smith at bosabosa.org, built with Next.js 12, React 18, Theme UI 0.17, and deployed on Netlify.

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
2. `next-mdx-remote` serializes markdown to MDX at build time in `getStaticProps`, with `remark-gfm` for GitHub Flavored Markdown support
3. `<MDXRemote>` renders the serialized MDX on the client, inheriting themed prose styles from the MDXProvider in `_app.js`
4. Posts are sorted by date (newest first) and enriched with prev/next navigation links
5. `getPostBySlug()` fetches all posts then filters — it's not a direct lookup

RSS feed and sitemap are generated at build time via `feed.js` and `sitemap.js` (triggered by `require()` in `pages/index.js` getStaticProps).

### Markdown Rendering Stack

The markdown-to-HTML pipeline:

```
.md file → gray-matter (frontmatter) → next-mdx-remote/serialize (with remark-gfm)
         → MDXRemote component → MDXProvider (useThemedStylesWithMdx) → themed HTML
```

- **Serialization** happens in `getStaticProps` of each page that renders markdown (`pages/news/[slug].js`, `pages/contact.js`)
- **remark-gfm** plugin enables: tables, strikethrough, task lists, autolinks
- **Theme UI prose styles** are defined in `theme.js` under `styles.*` (h1–h6, p, a, blockquote, pre, code, inlineCode, hr, ol, ul, li, table, th, td, img, del)
- **MDXProvider** in `_app.js` uses `useThemedStylesWithMdx()` from `@theme-ui/mdx` to automatically apply theme styles to all HTML elements generated from markdown
- **Themed.root** in `components/layout.js` applies `theme.styles.root` (base font, line-height, weight)
- **No custom MDX components** are passed — all styling comes from the theme
- **No syntax highlighting** for code blocks (monospace + muted background only)

### Supported Markdown Features

All standard markdown plus GitHub Flavored Markdown (via remark-gfm):

| Feature | Syntax | Styled |
|---------|--------|--------|
| Headings h1–h6 | `# ` through `###### ` | Yes (font, size, weight, margins) |
| Paragraphs | Plain text | Yes (line-height, margin) |
| Bold / Italic | `**bold**` / `_italic_` | Yes (browser default) |
| Links | `[text](url)` | Yes (primary color, visited, hover) |
| Ordered lists | `1. item` | Yes (padding, margins) |
| Unordered lists | `- item` | Yes (padding, margins) |
| Blockquotes | `> text` | Yes (left border, italic, gray) |
| Code blocks | ` ``` ` | Yes (mono font, muted bg, no syntax highlighting) |
| Inline code | `` `code` `` | Yes (mono font, muted bg, smaller) |
| Tables (GFM) | `\| col \| col \|` | Yes (borders, padding) |
| Strikethrough (GFM) | `~~text~~` | Yes (gray color) |
| Task lists (GFM) | `- [ ] item` | Yes (checkbox spacing) |
| Horizontal rules | `---` | Yes (border, margins) |
| Images | `![alt](url)` | Yes (max-width: 100%) |

### Routing

- `/` → redirects to `/news`
- `/news` → blog listing (pages/news.js)
- `/news/[slug]` → individual post (pages/news/[slug].js), statically generated
- `/contact` → markdown page (content/contact.md, serialized via next-mdx-remote in pages/contact.js)
- Permanent redirects: `/b` → `/news`, `/b/:slug` → `/news/:slug` (configured in next.config.js)

### Keyboard Navigation

On blog post pages (`/news/[slug]`):
- **Left arrow / h** → older post (matches `←` link)
- **Right arrow / l** → newer post (matches `→` link)
- **Escape** → back to `/news`

Modifier keys and input fields are ignored. Implemented in `components/use-keyboard-nav.js`.

### Styling

Uses Theme UI 0.17 with a centralized theme in `theme.js`. Components use the `sx` prop for styling. Light/dark mode toggle is built into the header. Layout uses CSS Grid with responsive breakpoints defined in `components/layout.js`.

The `_app.js` provider stack: `ThemeUIProvider` → `MdxThemeProvider` (MDXProvider + useThemedStylesWithMdx) → `Layout` → page component.

### Key Files

- `site.config.js` — site metadata (title, author, URL, postsPerPage)
- `theme.js` — Theme UI design tokens and prose styles (colors, fonts, layout, `styles.*` for markdown elements)
- `content.js` — content loading utilities (getPostSlugs, getAllPosts, getPostBySlug)
- `feed.js` — RSS feed generator (triggered at build time)
- `sitemap.js` — sitemap generator (triggered at build time)
- `gtag.js` — Google Analytics wrapper
- `pages/_app.js` — app wrapper with analytics, ThemeUIProvider, and MDXProvider for themed styles

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

Write standard markdown. All GitHub Flavored Markdown features work (tables, strikethrough, task lists). Code blocks render in monospace with a muted background but have no syntax highlighting.

### Adding a Markdown Page

To add a new static page rendered from markdown (like `/contact`):

1. Create `content/pagename.md` with the markdown content
2. Create `pages/pagename.js` with the pattern from `pages/contact.js`: read the file, serialize with `next-mdx-remote/serialize` + `remark-gfm`, render with `<MDXRemote>`

## Git Workflow

- `git push` to main triggers both **GitHub Actions CI** (build check) and **Netlify deploy**
- Always run `npm run build` locally before pushing to catch errors early
- Always `git pull --rebase origin main` before pushing — Renovate bot auto-commits version bumps to main, which causes push rejections if you're behind
- CI runs `npm install` then `npm run build`; the build generates RSS feed and sitemap as side effects
- There is no test runner — the build succeeding is the verification gate

## Environment Variables

- `NEXT_PUBLIC_GA_ID` — Google Analytics tracking ID
- `NEXT_PUBLIC_FB_PIXEL_ID` — Facebook Pixel ID (optional, tracking disabled if unset)
- `NODE_VERSION=22` — pinned in `netlify.toml` for Netlify builds
