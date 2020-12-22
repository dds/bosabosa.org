import Layout from "./layout"
import SEO from "./seo.js"
import React from "react"
import { MDXProvider } from "@mdx-js/react"

const MDXLayout = ({ children, pageContext }) => (
  <Layout>
    <SEO title={pageContext.frontmatter.title} />
    <MDXProvider>{children}</MDXProvider>
  </Layout>
)

export default MDXLayout
