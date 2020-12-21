import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Other = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Other than the blog..." />
      <Container>
        <p>
          Other than <Link to="/b">the blog</Link>, this site is my playground
          for exploring frontend, design, backend, continuous delivery, and
          anything else that catches my fancy.
        </p>
        <h3>Software</h3>
        <ul>
          <li>
            <Link to="https://github.com/dds/bosabosa.org">
              bosabosa.org (this site)
            </Link>
          </li>
        </ul>
      </Container>
    </Layout>
  )
}

export default Other
