/** @jsxImportSource theme-ui */
import { useRouter } from "next/router"
import { useColorMode, NavLink, Flex } from "theme-ui"
import Button from "./button"
import { useAuth } from "./auth-context"
import { useFontMode } from "./font-mode-context"
import { useTab } from "./tab-context"

const tabStyle = active => ({
  p: 2,
  cursor: "pointer",
  fontWeight: active ? "bold" : "normal",
  borderBottom: active ? "2px solid" : "2px solid transparent",
  borderColor: active ? "primary" : "transparent",
  mb: "-1px",
})

const Header = () => {
  const router = useRouter()
  const [mode, setMode] = useColorMode()
  const { isAuthenticated, login, logout, ready } = useAuth()
  const { fontMode, toggleFontMode } = useFontMode()
  const { activeTab, switchTab, tabs } = useTab()
  const isHome = router.pathname === "/"
  const currentTab = tabs.find(t => t.id === activeTab)

  return (
    <nav
      sx={{
        gridArea: `header`,
        borderBottom: `1px solid`,
        borderColor: `border`,
      }}
    >
      <Flex sx={{ p: `0 2rem`, flexFlow: `row wrap`, alignItems: `center` }}>
        {tabs.map(tab => (
          <NavLink
            key={tab.id}
            sx={tabStyle(isHome && activeTab === tab.id)}
            title={tab.label}
            onClick={e => {
              e.preventDefault()
              if (!isHome) router.push("/")
              switchTab(tab.id)
            }}
            href="/"
          >
            {tab.label}
          </NavLink>
        ))}
        {ready && (
          <NavLink
            sx={tabStyle(false)}
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
        {isHome && currentTab?.url && (
          <a
            href={currentTab.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: 1,
              color: "primary",
              textDecoration: "none",
              p: 2,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Open in new tab
          </a>
        )}
        <div sx={{ ml: `auto` }} />
        <Button
          sx={{ p: [1, 2], whiteSpace: `pre`, fontFamily: fontMode === "sans" ? "serif" : "sans" }}
          type="button"
          aria-label={fontMode === "sans" ? "Switch to serif font" : "Switch to sans-serif font"}
          onClick={toggleFontMode}
        >
          {fontMode === "sans" ? "Serif" : "Sans"}
        </Button>
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
