import fs from "fs"
import { join } from "path"
import matter from "gray-matter"

const root = process.cwd()

function getPostSlugs() {
  return fs.readdirSync(join(root, `content`, `blog`))
}

async function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = (
    await Promise.all(
      slugs.map(slug => innerGetPostBySlug(slug, [...fields, "date"]))
    )
  ).sort((a, b) => new Date(b.date) - new Date(a.date))
  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : index - 1
    const previousPostSlug =
      previousPostId !== null ? posts[previousPostId].slug : null
    const previousPostTitle =
      previousPostId !== null ? posts[previousPostId].title : null
    const nextPostId = index === posts.length - 1 ? null : index + 1
    const nextPostSlug = nextPostId !== null ? posts[nextPostId].slug : null
    const nextPostTitle = nextPostId !== null ? posts[nextPostId].title : null
    post.index = index
    post.previousPostIndex = previousPostId
    post.previousPostSlug = previousPostSlug
    post.previousPostTitle = previousPostTitle
    post.nextPostIndex = nextPostId
    post.nextPostSlug = nextPostSlug
    post.nextPostTitle = nextPostTitle
  })
  return posts
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
      items[field] =
        data[field] instanceof Date ? data[field].toISOString() : data[field]
      return
    }
  })

  return items
}

module.exports = {
  getPostSlugs,
  getAllPosts,
  getPostBySlug,
}
