import React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="About" />
      <Bio />
    </Layout>
  )
}

export default About
