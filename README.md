# bosabosa.org

Personal website and blog of David D. Smith, built with Next.js and deployed on Netlify.

## Quick Start

```sh
npm install
npm run dev     # http://localhost:8000
```

## Writing Posts

Create a markdown file in `content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
date: 2024-01-15
description: "A short summary for the listing page and RSS feed"
tags: ["tag1", "tag2"]
---

Your markdown content here.
```

The `date` field is flexible — `2024-01-15`, `Jan 15 2024`, `2024-01-15T10:30:00-0800` all work. Any value parseable by `new Date()` is accepted.

Add `draft: true` to hide a post from production. Drafts are visible locally with `npm run dev` but excluded from `npm run build`.

Posts are sorted by date (newest first) and automatically get prev/next navigation links.

## Markdown Support

All standard markdown works, plus [GitHub Flavored Markdown](https://github.github.com/gfm/) features:

- **Headings** (h1–h6) with proper typographic hierarchy
- **Bold**, _italic_, and ~~strikethrough~~
- Links with distinct colors for visited/unvisited
- Ordered and unordered lists with proper spacing
- Blockquotes with left border styling
- Code blocks (monospace with muted background)
- `Inline code` with subtle background
- Tables with borders and padding
- Task lists with checkboxes
- Horizontal rules
- Images (responsive, max-width: 100%)

All markdown elements are automatically styled through Theme UI's prose system — no CSS classes or special syntax needed. Just write markdown and it looks good in both light and dark mode.

## Keyboard Navigation

On blog post pages:

| Key | Action |
|-----|--------|
| `←` or `h` | Go to older post |
| `→` or `l` | Go to newer post |
| `Escape` | Back to post listing |

## Adding Pages

To add a new markdown-powered page (like `/contact`):

1. Write your content in `content/pagename.md`
2. Create `pages/pagename.js` following the pattern in `pages/contact.js`

## Stack

- [Next.js](https://nextjs.org) 12 — static site generation
- [React](https://react.dev) 18
- [Theme UI](https://theme-ui.com) 0.17 — design tokens and prose styling
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) 5 — markdown rendering at build time
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 8000 |
| `npm run build` | Production build |
| `npm run format` | Prettier formatting |
| `npm run deploy` | Push to main (triggers Netlify deploy) |

## License

UNLICENSED
