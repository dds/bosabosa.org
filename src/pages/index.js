/** @jsx jsx */
import { jsx } from "theme-ui"

import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"

const Index = ({ location }) => {
  return (
    <Layout location={location}>
      <BlogRoll />
    </Layout>
  )
}

export default Index
