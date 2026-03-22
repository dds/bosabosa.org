/** @jsxImportSource theme-ui */
import Link from "next/link"
import { useColorMode, NavLink, Flex } from "theme-ui"
import Button from "./button"
import { useAuth } from "./auth-context"

const Header = () => {
  const [mode, setMode] = useColorMode()
  const { isAuthenticated, login, logout, ready } = useAuth()
  return (
    <nav
      sx={{
        gridArea: `header`,
        borderBottom: `1px solid`,
        borderColor: `border`,
      }}
    >
      <Flex sx={{ p: `0 2rem`, flexFlow: `row wrap`, alignItems: `center` }}>
        <Link href="/" passHref>
          <NavLink sx={{ p: 2 }} title="Home">
            Home
          </NavLink>
        </Link>
        <Link href="/rss.xml" passHref>
          <NavLink sx={{ p: 2 }} title="Subscribe">
            Subscribe
          </NavLink>
        </Link>
        <Link href="/contact" passHref>
          <NavLink sx={{ p: 2 }} title="Contact">
            Contact
          </NavLink>
        </Link>
        <Link href="https://github.com/dds/bosabosa.org" passHref>
          <NavLink sx={{ p: 2, ml: [`auto`] }} title="Source">
            Source
          </NavLink>
        </Link>
        {ready && (
          <Button
            sx={{ p: [1, 2], whiteSpace: `pre` }}
            type="button"
            onClick={isAuthenticated ? logout : login}
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </Button>
        )}
        <Button
          sx={{ p: [1, 2], whiteSpace: `pre` }}
          name="colorMode"
          type="button"
          aria-label={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={e => {
            const next = mode === "dark" ? "light" : "dark"
            setMode(next)
          }}
        >
          <svg viewBox="0 0 32 32" width="24" height="24" fill="currentcolor" aria-hidden="true">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="currentcolor"
              strokeWidth="4"
            ></circle>
            <path
              d="
          M 16 0
          A 16 16 0 0 0 16 32
          z
        "
            ></path>
          </svg>
        </Button>
      </Flex>
    </nav>
  )
}

export default Header
