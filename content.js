import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import superjson from "superjson"
import { serialize } from "next-mdx-remote/serialize"

const root = process.cwd()

export function getPostSlugs() {
  return fs.readdirSync(join(root, `content`, `blog`))
}

export function getPostBySlug(slug, fields = []) {
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
    }
    if (field === `content`) {
      items[field] = content
    }
    if (field === `source`) {
      items[field] = mdxSource
    }
    if (field === `wordCount`) {
      items[field] = content.split(/\s+/gu).length
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"))
  return posts
}
