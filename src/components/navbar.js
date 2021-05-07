/** @jsx jsx */
import { jsx, Box, NavLink } from "theme-ui"
import { Link } from "gatsby"

export default () => {
  return (
    <Box sx={{ flex: `1 1 auto` }} as="nav">
      <NavLink sx={{ p: 2 }} as={Link} to="/" title="Home">
        Home
      </NavLink>
      <NavLink sx={{ p: 2 }} as={Link} to="/b" title="Blog">
        Blog
      </NavLink>
      <NavLink sx={{ p: 2 }} as={Link} to="/tags" title="Tags">
        Tags
      </NavLink>
      <NavLink sx={{ p: 2 }} as={Link} to="/a" title="About">
        About
      </NavLink>
    </Box>
  )
}
