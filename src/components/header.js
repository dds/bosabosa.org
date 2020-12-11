import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Container } from "react-bootstrap"
import Navbar from "./navbar"
import SEO from "./seo"
import Search from "./search"
import { jsx } from "theme-ui"

const Header = () => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `)
  return (
    <Container fluid className="px-0">
      <header>
        <h1>
          <Link to="/">dds's website</Link>
        </h1>
        <Navbar />
        <Search searchIndex={data.siteSearchIndex.index} />
      </header>
    </Container>
  )
}

export default Header
