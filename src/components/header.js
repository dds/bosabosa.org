/** @jsx jsx */
import { jsx, useColorMode, NavLink, Flex } from "theme-ui"
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
        <NavLink sx={{ p: 2 }} href="/" title="Home">
          Home
        </NavLink>
        <NavLink sx={{ p: 2 }} href="/rss.xml" title="Subscribe">
          Subscribe
        </NavLink>
        <NavLink sx={{ p: 2 }} href="/contact" title="Contact">
          Contact
        </NavLink>
        {/* <Search sx={{ p: 2 }} /> */}
        <NavLink
          sx={{ p: 2, ml: [`auto`] }}
          href="https://github.com/dds/bosabosa.org"
          title="Source"
        >
          Source
        </NavLink>
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
              stroke-width="4"
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
