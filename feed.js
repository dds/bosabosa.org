import fs from "fs"
import ReactDOMServer from "react-dom/server"
import { MDXProvider } from "@mdx-js/react"
import MDX from "@mdx-js/runtime"
import { Feed } from "feed"
import { getAllPosts } from "./content"
import config from "./site.config"

async function genRss() {
  const date = new Date()
  const feedConfig = Object.assign(
    {
      id: config.url,
      link: config.url,
      // image: `${baseUrl}/images/logo.svg`,
      // favicon: `${baseUrl}/favicon.ico`,
      copyright: `All rights reserved ${date.getFullYear()}, ${config.author}.`,
      updated: date,
      generator: "Next.js using Feed for Node.js",
      feedLinks: { rss2: `${config.url}/rss.xml` },
    },
    config
  )
  const feed = new Feed(feedConfig)

  const posts = await getAllPosts([
    "title",
    "description",
    "excerpt",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "coverImageAlt",
    "coverImageHeight",
    "coverImageWidth",
    "draft",
  ])

  posts.forEach(post => {
    const url = `${config.url}/news/${post.slug}`
    const content = ReactDOMServer.renderToStaticMarkup(
      <MDX>{post.content}</MDX>
    )
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description || post.excerpt,
      content: content,
      author: [config.author],
      date: new Date(post.date),
    })
  })
  fs.writeFileSync(`./public/rss.xml`, feed.rss2())
}

genRss()
