/** @jsx jsx */
import { jsx, Flex, Container, Heading } from "theme-ui"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import Navbar from "./navbar"
import Search from "./search"

const Header = ({ title }) => {
  return (
    <Container fluid sx={{ borderBottom: `1px solid`, p: `0 4rem` }}>
      <Helmet>
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>
      <Flex as="div" fixed="top">
        <Navbar />
        <Search />
      </Flex>
    </Container>
  )
}

export default Header
