import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import superjson from "superjson"
import { serialize } from "next-mdx-remote/serialize"

const root = process.cwd()

export function getPostSlugs() {
  return fs.readdirSync(join(root, `content`, `blog`))
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => innerGetPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => post2.date - post1.date)
  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : index - 1
    const nextPostId = index === posts.length - 1 ? null : index + 1
    post.index = index
    post.nextPostIndex = nextPostId
    if (!!posts[nextPostId]) {
      post.nextPost = posts[nextPostId]
    }
    post.previousPostIndex = previousPostId
    if (!!posts[previousPostId]) {
      post.previousPost = posts[previousPostId]
    }
  })
  return posts
}

export function innerGetPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx?$/, ``)
  const fullPath = join(root, `content`, `blog`, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, `utf8`)
  const { data, content } = matter(fileContents)

  const mdxSource = serialize(content, {
    mdxOptions: {
      // remarkPlugins: [
      //   require("remark-autolink-headings"),
      //   require("remark-slug"),
      //   require("remark-code-titles"),
      // ],
      // rehypePlugins: [mdxPrism],
    },
  })
  // const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
  // const tweetIDs = tweetMatches?.map(tweet => tweet.match(/[0-9]+/g)[0])

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
    if (field === `source`) {
      items[field] = mdxSource
      return
    }
    if (field === `wordCount`) {
      items[field] = content.split(/\s+/gu).length
      return
    }
    if (field === `date`) {
      items[field] = new Date(data[field])
      return
    }
    if (data[field]) {
      items[field] = data[field]
      return
    }
  })

  return items
}

export function getPostBySlug(slug, fields = []) {
  const posts = getAllPosts(fields)
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].slug === slug) {
      return posts[i]
    }
  }
  return null
}
