import fs from "fs"
import { join } from "path"
import matter from "gray-matter"

const root = process.cwd()

function getPostSlugs() {
  return fs.readdirSync(join(root, `content`, `blog`))
}

const isDev = process.env.NODE_ENV !== "production"

async function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const allPosts = await Promise.all(
    slugs.map(slug => innerGetPostBySlug(slug, [...fields, "date", "draft"]))
  )
  const posts = allPosts
    .filter(post => isDev || !post.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  return posts.map((post, index) => {
    const prev = index > 0 ? posts[index - 1] : null
    const next = index < posts.length - 1 ? posts[index + 1] : null
    return {
      ...post,
      previousPostSlug: prev ? prev.slug : null,
      previousPostTitle: prev ? prev.title : null,
      nextPostSlug: next ? next.slug : null,
      nextPostTitle: next ? next.title : null,
    }
  })
}

async function getPostBySlug(slug, fields = []) {
  const posts = await getAllPosts(fields)
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].slug === slug) {
      return posts[i]
    }
  }
  return null
}

async function innerGetPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx?$/, ``)
  const fullPath = join(root, `content`, `blog`, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, `utf8`)
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === `slug`) {
      items[field] = realSlug
      return
    }
    if (field === `content`) {
      items[field] = content
      return
    }
    if (field === `wordCount`) {
      items[field] = content.split(/\s+/gu).length
      return
    }
    if (data[field]) {
      if (field === "date") {
        const d =
          data[field] instanceof Date ? data[field] : new Date(data[field])
        items[field] = d.toISOString()
      } else {
        items[field] = data[field]
      }
      return
    }
  })

  return items
}

export { getPostSlugs, getAllPosts, getPostBySlug }
