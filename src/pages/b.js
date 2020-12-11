import React from "react"

import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <BlogRoll />
    </Layout>
  )
}

export default BlogIndex
