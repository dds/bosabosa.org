/** @jsxImportSource theme-ui */
import Link from "next/link"
import { NavLink, Flex } from "theme-ui"

const Footer = () => {
  return (
    <footer
      sx={{ gridArea: `footer`, borderTop: `1px solid`, borderColor: `border` }}
    >
      <Flex sx={{ p: `0 2rem` }}>
        <Link href="/rss.xml" passHref>
          <NavLink sx={{ p: 2 }} title="Subscribe via RSS">
            Subscribe
          </NavLink>
        </Link>
        <span sx={{ p: 2, ml: `auto` }}>
          &copy; {new Date().getFullYear()} David D. Smith
        </span>
      </Flex>
    </footer>
  )
}

export default Footer
