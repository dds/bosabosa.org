/** @jsxImportSource theme-ui */
import { Heading, Text } from "theme-ui"
import BlogRoll from "../components/blogroll"
import Meta from "../components/meta"
import { useTab } from "../components/tab-context"
import config from "../site.config"
import { getAllPosts } from "../content"

export default function Home({ posts }) {
  const { activeTab } = useTab()

  return (
    <>
      <Meta />
      {activeTab === "home" && (
        <div sx={{ py: 4 }}>
          <Heading as="h1" sx={{ mb: 3 }}>
            {config.title}
          </Heading>
          <Text sx={{ fontSize: 3, color: "gray", lineHeight: "body" }}>
            {config.subtitle}
          </Text>
        </div>
      )}
      {activeTab === "blog" && <BlogRoll posts={posts} />}
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
