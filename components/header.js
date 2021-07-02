/** @jsxImportSource theme-ui */
import Link from "next/link"
import { useColorMode, NavLink, Flex } from "theme-ui"
import Button from "./button"

const getModeName = mode => {
  switch (mode) {
    case "dark":
      return "Dark"
    case "deep":
      return "Deep"
    case "swiss":
      return "Swiss"
    case "light":
    case "default":
      return "Light"
    case undefined:
      return "         "
    default:
      return mode
  }
}

const Header = ({ title }) => {
  const [mode, setMode] = useColorMode()
  return (
    <nav sx={{ gridArea: `header`, borderBottom: `1px solid` }}>
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
        {/* <Search sx={{ p: 2 }} /> */}
        <Link href="https://github.com/dds/bosabosa.org" passHref>
          <NavLink sx={{ p: 2, ml: [`auto`] }} title="Source">
            Source
          </NavLink>
        </Link>
        <Button
          sx={{ p: [1, 2], whiteSpace: `pre` }}
          name="colorMode"
          type="button"
          onClick={e => {
            const next = mode === "dark" ? "light" : "dark"
            setMode(next)
          }}
        >
          <svg viewBox="0 0 32 32" width="24" height="24" fill="currentcolor">
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
