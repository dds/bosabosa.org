/** @jsx jsx */
import { jsx, Flex, NavLink } from "theme-ui"
import { Link } from "gatsby"

export default () => {
  return (
    <Flex
      as="nav"
      variant={toString()}
      fixed="top"
      collapseOnSelect
      expand="md"
    >
      <NavLink as={Link} to="/" title="Home">
        /
      </NavLink>
      <NavLink as={Link} to="/b" title="Blog">
        Blog
      </NavLink>
      <NavLink as={Link} to="/o" title="Other">
        Other
      </NavLink>
      <NavLink as={Link} to="/tags" title="Tags">
        Tags
      </NavLink>
      <NavLink as={Link} to="/a" title="About">
        About
      </NavLink>
    </Flex>
  )
}
