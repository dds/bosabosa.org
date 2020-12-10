import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Container } from "react-bootstrap"
import Navbar from "./navbar"
import SEO from "./seo"
import Search from "./search"
import { css } from "@emotion/react"

const style = css`
  // border: 1px solid red;
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `)
  return (
    <Container css={style} fluid className="px-0">
      <header>
        <Navbar />
        <Search searchIndex={data.siteSearchIndex.index} />
      </header>
    </Container>
  )
}

export default Header
