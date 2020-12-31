/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import { Container } from "react-bootstrap"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import Navbar from "./navbar"
import Search from "./search"

const Header = ({ title }) => {
  return (
    <Container fluid>
      <Helmet>
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>
      <header sx={{ mb: `5rem` }}>
        <Heading as="h1" variant="styles.h1">
          <Link to="/">{title}</Link>
        </Heading>
        <Navbar />
        <Search />
      </header>
    </Container>
  )
}

export default Header
