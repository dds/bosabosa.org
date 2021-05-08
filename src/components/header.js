/** @jsx jsx */
import { jsx, NavLink, Flex, Container, Heading } from "theme-ui"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

import Search from "./search"

const Header = ({ title }) => {
  return (
    <header sx={{ width: `100%`, borderBottom: `1px solid`, bottom: 0 }}>
      <Flex sx={{ p: `0 4rem`, flex: `1 1 auto` }}>
        <Helmet>
          <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Helmet>
        <NavLink sx={{ p: 2 }} as={Link} to="/" title="Home">
          Home
        </NavLink>
        <NavLink sx={{ p: 2 }} as={Link} to="/subscribe" title="Subscribe">
          Subscribe
        </NavLink>
        <NavLink sx={{ p: 2 }} as={Link} to="/contact" title="Contact">
          Contact
        </NavLink>
        <Search sx={{ p: 2 }} />
        <NavLink
          sx={{ p: 2, ml: `auto` }}
          as={Link}
          to="https://github.com/dds/bosabosa.org"
          title="Source"
        >
          Source
        </NavLink>
      </Flex>
    </header>
  )
}

export default Header
