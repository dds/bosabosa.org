import config from "../site.config"
import BlogRoll from "../components/blogroll"
import { getAllPosts } from "../content"

export default function Blog({ posts }) {
  return <BlogRoll posts={posts} />
}

export async function getStaticProps() {
  const posts = await getAllPosts([
    `title`,
    `slug`,
    `date`,
    `exerpt`,
    `description`,
  ])
  return { props: { posts } }
}
