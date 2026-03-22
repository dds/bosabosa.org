/** @jsxImportSource theme-ui */
import BlogRoll from "../components/blogroll"
import BlogLayout from "../components/blog-layout"
import Meta from "../components/meta"
import { useTab } from "../components/tab-context"
import { getAllPosts } from "../content"

export default function Home({ posts }) {
  const { activeTab } = useTab()

  return (
    <>
      <Meta />
      {activeTab === "blog" && (
        <BlogLayout>
          <BlogRoll posts={posts} />
        </BlogLayout>
      )}
      {activeTab === "dashboard" && (
        <iframe
          src="https://dash.bosabosa.org"
          title="Dashboard"
          sx={{
            width: "100%",
            height: "80vh",
            border: "1px solid",
            borderColor: "border",
            borderRadius: 4,
          }}
        />
      )}
    </>
  )
}

export async function getStaticProps() {
  require("../feed")
  require("../sitemap")
  const posts = await getAllPosts([
    `title`,
    `slug`,
    `date`,
    `excerpt`,
    `description`,
  ])
  return { props: { posts } }
}
