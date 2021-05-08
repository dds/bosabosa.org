/** @jsx jsx */
import { jsx, NavLink, Flex } from "theme-ui"
import { Link } from "gatsby"

import Contact from "./contact"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Footer = () => {
  const { author } = useSiteMetadata()
  return (
    <footer
      sx={{
        width: `100%`,
        borderTop: `1px solid`,
        bottom: 0,
        position: `fixed`,
      }}
    >
      <Flex sx={{ p: `0 4rem` }}>
        <NavLink sx={{ p: 2 }} as={Link} to="/contact" title="Contact">
          Contact
        </NavLink>
        <span sx={{ p: 2, ml: `auto` }}>
          &copy; {new Date().getFullYear()} {author.name}.
        </span>
      </Flex>
    </footer>
  )
}

export default Footer
