/** @jsx jsx */
import { jsx } from "theme-ui"

import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"

const Index = ({ location }) => {
  const title = "bosabosa"
  return (
    <Layout location={location} title={title}>
      <BlogRoll />
    </Layout>
  )
}

export default Index
