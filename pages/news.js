/** @jsxImportSource theme-ui */
import config from "../site.config"

import BlogRoll from "../components/blogroll"
import { getAllPosts } from "../content"

export default function Blog({ posts }) {
  return <BlogRoll posts={posts} />
}

export async function getStaticProps() {
  require("../feed")
  const posts = await getAllPosts(["slug"])
  return { props: { posts } }
}
