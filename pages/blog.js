/** @jsxImportSource theme-ui */
import BlogRoll from "../components/blogroll"
import { getAllContentFrontMatter } from "../content"

export default function Blog({ posts }) {
  return <BlogRoll posts={posts} />
}

export async function getStaticProps() {
  const posts = await getAllContentFrontMatter(`blog`)
  return { props: { posts } }
}
