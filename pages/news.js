import BlogRoll from "../components/blogroll"
import BlogLayout from "../components/blog-layout"
import Meta from "../components/meta"
import { getAllPosts } from "../content"

export default function Blog({ posts }) {
  return (
    <>
      <Meta title="Posts" />
      <BlogLayout>
        <BlogRoll posts={posts} />
      </BlogLayout>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts([
    `title`,
    `slug`,
    `date`,
    `excerpt`,
    `description`,
  ])
  return { props: { posts } }
}
