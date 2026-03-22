/** @jsxImportSource theme-ui */
import Link from "next/link"
import { NavLink, Flex } from "theme-ui"
import { useAuth } from "./auth-context"

const Footer = () => {
  const { isAuthenticated, login, logout, ready } = useAuth()
  return (
    <footer
      sx={{ gridArea: `footer`, borderTop: `1px solid`, borderColor: `border` }}
    >
      <Flex sx={{ p: `0 2rem` }}>
        {ready && (
          <NavLink
            sx={{ p: 2, cursor: "pointer" }}
            title={isAuthenticated ? "Sign Out" : "Sign In"}
            onClick={e => {
              e.preventDefault()
              isAuthenticated ? logout() : login()
            }}
            href="#"
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </NavLink>
        )}
        <Link href="/rss.xml" passHref>
          <NavLink sx={{ p: 2 }} title="Subscribe via RSS">
            Subscribe
          </NavLink>
        </Link>
        <a
          href="https://github.com/dds/bosabosa.org"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            variant: "links.nav",
            p: 2,
          }}
        >
          Source
        </a>
        <span sx={{ p: 2, ml: `auto` }}>
          &copy; {new Date().getFullYear()} David D. Smith
        </span>
      </Flex>
    </footer>
  )
}

export default Footer
