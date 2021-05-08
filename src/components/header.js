/** @jsx jsx */
import { jsx, NavLink, Flex, Container, Heading } from "theme-ui"
import { Helmet } from "react-helmet"

import Search from "./search"

const Header = ({ title }) => {
  return (
    <header sx={{ width: `100%`, borderBottom: `1px solid` }}>
      <Flex sx={{ p: `0 4rem`, flexFlow: `row wrap` }}>
        <Helmet>
          <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Helmet>
        <NavLink sx={{ p: 2, mr: 2 }} href="/" title="Home">
          Home
        </NavLink>
        <NavLink sx={{ p: 2, mr: 2 }} href="/rss.xml" title="Subscribe">
          Subscribe
        </NavLink>
        <NavLink sx={{ p: 2, mr: 3 }} href="/contact" title="Contact">
          Contact
        </NavLink>
        <Search sx={{ p: 2 }} />
        <NavLink
          sx={{ p: 2, ml: `auto` }}
          href="https://github.com/dds/bosabosa.org"
          title="Source"
        >
          Source
        </NavLink>
      </Flex>
    </header>
  )
}

export default Header
