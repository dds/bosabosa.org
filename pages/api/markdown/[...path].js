import fs from "fs"
import { join } from "path"
import matter from "gray-matter"

const root = process.cwd()

export default function handler(req, res) {
  const pathSegments = req.query.path
  if (!pathSegments || pathSegments.length === 0) {
    res.status(404).end("Not found")
    return
  }

  const route = pathSegments.join("/")

  // Blog post: /api/markdown/news/[slug]
  if (pathSegments[0] === "news" && pathSegments.length === 2) {
    const slug = pathSegments[1]
    const filePath = join(root, "content", "blog", `${slug}.md`)
    if (!fs.existsSync(filePath)) {
      res.status(404).end("Post not found")
      return
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    const title = data.title || slug
    const date = data.date
      ? new Date(
          data.date instanceof Date ? data.date : new Date(data.date)
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : ""

    const markdown = `# ${title}\n\n${date ? `*${date}*\n\n` : ""}${content.trim()}\n`
    const tokens = Math.ceil(markdown.length / 4)
    res
      .setHeader("Content-Type", "text/markdown; charset=utf-8")
      .setHeader("x-markdown-tokens", String(tokens))
      .status(200)
      .send(markdown)
    return
  }

  // News listing: /api/markdown/news
  if (route === "news") {
    const blogDir = join(root, "content", "blog")
    const slugs = fs.readdirSync(blogDir)
    const posts = slugs
      .map(slug => {
        const filePath = join(blogDir, slug)
        const fileContents = fs.readFileSync(filePath, "utf8")
        const { data } = matter(fileContents)
        if (process.env.NODE_ENV === "production" && data.draft) return null
        const realSlug = slug.replace(/\.mdx?$/, "")
        const date = data.date
          ? new Date(
              data.date instanceof Date ? data.date : new Date(data.date)
            )
          : new Date(0)
        return { slug: realSlug, title: data.title || realSlug, date, description: data.description || "" }
      })
      .filter(Boolean)
      .sort((a, b) => b.date - a.date)

    let markdown = "# typo.army - Blog Posts\n\n"
    for (const post of posts) {
      const dateStr = post.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      markdown += `- [${post.title}](/news/${post.slug}) - ${dateStr}\n`
      if (post.description) {
        markdown += `  ${post.description}\n`
      }
    }

    const tokens = Math.ceil(markdown.length / 4)
    res
      .setHeader("Content-Type", "text/markdown; charset=utf-8")
      .setHeader("x-markdown-tokens", String(tokens))
      .status(200)
      .send(markdown)
    return
  }

  // Contact page: /api/markdown/contact
  if (route === "contact") {
    const filePath = join(root, "content", "contact.md")
    if (!fs.existsSync(filePath)) {
      res.status(404).end("Page not found")
      return
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { content } = matter(fileContents)
    const markdown = content.trim() + "\n"
    const tokens = Math.ceil(markdown.length / 4)
    res
      .setHeader("Content-Type", "text/markdown; charset=utf-8")
      .setHeader("x-markdown-tokens", String(tokens))
      .status(200)
      .send(markdown)
    return
  }

  res.status(404).end("Not found")
}
