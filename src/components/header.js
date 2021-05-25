/** @jsx jsx */
import { jsx, useColorMode, NavLink, Flex } from "theme-ui"

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
          sx={{ p: 2, ml: `auto` }}
          href="https://github.com/dds/bosabosa.org"
          title="Source"
        >
          Source
        </NavLink>
        <button
          name="colorMode"
          type="button"
          onClick={e => {
            const next = mode === "dark" ? "light" : "dark"
            setMode(next)
          }}
        >
          {mode}
        </button>
      </Flex>
    </nav>
  )
}

export default Header
