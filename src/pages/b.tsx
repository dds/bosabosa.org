import React from "react"
import { Container } from "react-bootstrap"
import { useStaticQuery, Link, graphql } from "gatsby"

import BlogRoll from "../components/blogroll"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ location }) => {
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

export default BlogIndex
