import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Index = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Home" />
      <BlogRoll />
    </Layout>
  )
}

export default Index
