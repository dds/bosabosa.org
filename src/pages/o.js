import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Other = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Other" />
      <h1>Other</h1>
      <p>nothing</p>
    </Layout>
  )
}

export default Other

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
