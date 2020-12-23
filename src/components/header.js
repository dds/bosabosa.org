import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "gatsby"

import Navbar from "./navbar"
import Search from "./search"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useSiteSearchIndex } from "../hooks/use-site-searchindex"

const Header = () => {
  const { title } = useSiteMetadata()
  const index = useSiteSearchIndex()
  return (
    <Container fluid>
      <header>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
        <Navbar />
        <Search searchIndex={index} />
      </header>
    </Container>
  )
}

export default Header
