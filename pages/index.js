import BlogRoll from "../components/blogroll"
import Meta from "../components/meta"
import { getAllPosts } from "../content"

export default function Blog({ posts }) {
  return (
    <>
      <Meta />
      <BlogRoll posts={posts} />
    </>
  )
}

export async function getStaticProps() {
  require("../feed")
  const posts = await getAllPosts([
    `title`,
    `slug`,
    `date`,
    `excerpt`,
    `description`,
  ])
  return { props: { posts } }
}
