import React from "react"
import { Container } from "react-bootstrap"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import Navbar from "./navbar"
import Search from "./search"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Header = () => {
  const { title } = useSiteMetadata()
  return (
    <Container fluid>
      <Helmet>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
      </Helmet>
      <header>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
        <Navbar />
        <Search />
      </header>
    </Container>
  )
}

export default Header
