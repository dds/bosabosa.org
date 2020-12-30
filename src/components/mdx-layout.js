/** @jsx jsx */
import { jsx } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import Layout from "./layout"

const MDXLayout = ({ children, pageContext }) => (
  <Layout title={pageContext.frontmatter.title}>
    <MDXProvider>{children}</MDXProvider>
  </Layout>
)

export default MDXLayout
