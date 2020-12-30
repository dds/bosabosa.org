/** @jsx jsx */
import { jsx } from "theme-ui"

import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Index = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Latest Blog Posts" />
      <BlogRoll />
    </Layout>
  )
}

export default Index
