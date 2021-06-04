import fs from "fs"
import path from "path"
import matter from "gray-matter"
import superjson from "superjson"
import { serialize } from "next-mdx-remote/serialize"

const root = process.cwd()

export async function getContent(type) {
  return fs.readdirSync(path.join(root, `content`, type))
}

export async function getContentBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(path.join(root, `content`, type, `${slug}.md`), `utf8`)
    : fs.readFileSync(path.join(root, `content`, `${type}.md`), `utf8`)

  const { data, content } = matter(source)
  const mdxSource = await serialize(content, {
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

  return {
    mdxSource,
    // tweetIDs: tweetIDs || [],
    frontMatter: {
      // wordCount: content.split(/\s+/gu).length,
      // readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  }
}

export async function getAllContentFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, `content`, type))

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, `content`, type, postSlug),
      `utf8`
    )
    const { data } = matter(source)
    // Serialize date
    const formattedDate = data.date.toString()

    return [
      {
        ...data,
        slug: postSlug.replace(`.md`, ``),
        date: formattedDate,
      },
      ...allPosts,
    ]
  }, [])
}
