/** @jsx jsx */
import { jsx } from "theme-ui"

import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"

export default BlogIndex({ location }) => {
  return (
    <Layout location={location}>
      <BlogRoll />
    </Layout>
  )
}
