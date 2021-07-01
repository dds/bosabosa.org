/** @jsxImportSource theme-ui */
import { NavLink, Flex } from "theme-ui"

const Footer = () => {
  return (
    <footer sx={{ gridArea: `footer`, borderTop: `1px solid` }}>
      <Flex sx={{ p: `0 2rem` }}>
        <NavLink sx={{ p: 2 }} to="/contact" title="Contact">
          Contact
        </NavLink>
        <span sx={{ p: 2, ml: `auto` }}>
          &copy; {new Date().getFullYear()} David D. Smith
        </span>
      </Flex>
    </footer>
  )
}

export default Footer
