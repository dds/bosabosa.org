import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Index = ({ location }) => {
  const { title } = useSiteMetadata()

  return (
    <Layout location={location} title={title}>
      <SEO title="Latest Blog Posts..." />
      <BlogRoll />
    </Layout>
  )
}

export default Index
