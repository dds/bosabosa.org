/** @jsxImportSource theme-ui */
import Link from "next/link"
import { Flex } from "theme-ui"
import { useAuth } from "./auth-context"

const linkStyle = {
  p: 2,
  color: "text",
  textDecoration: "none",
  "&:hover": { textDecoration: "underline" },
}

const Footer = () => {
  const { isAuthenticated, login, logout } = useAuth()
  return (
    <footer
      sx={{ gridArea: `footer`, borderTop: `1px solid`, borderColor: `border` }}
    >
      <Flex sx={{ p: `0 2rem`, alignItems: "center" }}>
        <a
          href="#"
          sx={{ ...linkStyle, cursor: "pointer" }}
          onClick={e => {
            e.preventDefault()
            isAuthenticated ? logout() : login()
          }}
        >
          {isAuthenticated ? "Sign Out" : "Sign In"}
        </a>
        <Link href="/rss.xml" passHref>
          <a sx={linkStyle}>Subscribe</a>
        </Link>
        <a
          href="https://github.com/dds/bosabosa.org"
          target="_blank"
          rel="noopener noreferrer"
          sx={linkStyle}
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
