/** @jsxImportSource theme-ui */
import { useState } from "react"
import BlogRoll from "../components/blogroll"
import Meta from "../components/meta"
import { getAllPosts } from "../content"

const tabs = [
  { id: "blog", label: "Blog" },
  { id: "dashboard", label: "Dashboard" },
]

export default function Home({ posts }) {
  const [activeTab, setActiveTab] = useState("blog")

  return (
    <>
      <Meta />
      <div
        role="tablist"
        sx={{
          display: "flex",
          borderBottom: "2px solid",
          borderColor: "border",
          mb: 3,
          gap: 1,
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            sx={{
              appearance: "none",
              bg: activeTab === tab.id ? "muted" : "transparent",
              color: "text",
              border: "none",
              borderBottom:
                activeTab === tab.id ? "2px solid" : "2px solid transparent",
              borderColor: activeTab === tab.id ? "primary" : "transparent",
              px: 3,
              py: 2,
              mb: "-2px",
              fontFamily: "inherit",
              fontSize: 2,
              fontWeight: activeTab === tab.id ? "bold" : "normal",
              cursor: "pointer",
              "&:hover": {
                bg: "muted",
              },
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {activeTab === "blog" && <BlogRoll posts={posts} />}
        {activeTab === "dashboard" && (
          <div>
            <div sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <a
                href="https://dash.bosabosa.org"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: 1,
                  color: "primary",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Open in new tab
              </a>
            </div>
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
          </div>
        )}
      </div>
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
