/** @jsxImportSource theme-ui */
import { Grid, Text } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
import "normalize.css"

import config from "../site.config"
import { useFontMode } from "./font-mode-context"
import Footer from "./footer"
import Header from "./header"
import SkipNavLink from "./skip-nav"

const layoutXS = `'header' 'main' 'aside' 'footer'`
const layoutS = layoutXS
const layoutM = `
      'header  header'
      'aside   main'
      'footer  footer'`
const layoutL = layoutM

const Layout = ({ children }) => {
  const { fontMode } = useFontMode()
  return (
    <Themed.root>
      <SkipNavLink>Skip to content</SkipNavLink>
      <Grid
        sx={{
          height: `100vh`,
          fontFamily: fontMode,
          gridTemplateAreas: [layoutXS, layoutS, layoutM, layoutL],
          gridTemplateColumns: ["1fr", "1fr", "28ch 1fr", "28ch 1fr"],
          gridTemplateRows: [
            "min-content 1fr min-content min-content",
            "min-content 1fr min-content min-content",
            "min-content 1fr min-content",
            "min-content 1fr min-content",
          ],
        }}
      >
        <Header />
        <main
          id="skip-nav"
          sx={{
            gridArea: `main`,
            px: 3,
            py: 3,
          }}
        >
          {children}
        </main>
        <aside
          sx={{
            gridArea: `aside`,
            px: 3,
            py: 4,
            borderRight: ["none", "none", "1px solid", "1px solid"],
            borderColor: "border",
            overflow: "auto",
            resize: ["none", "none", "horizontal", "horizontal"],
            minWidth: "16ch",
            maxWidth: "60ch",
          }}
        >
          <Text
            sx={{
              fontWeight: "bold",
              fontSize: 3,
              mb: 2,
              display: "block",
              fontFamily: "sans",
            }}
          >
            {config.title}
          </Text>
          <Text sx={{ fontSize: 1, color: "gray", mb: 3, display: "block" }}>
            {config.author}
          </Text>
          <Text
            sx={{ fontSize: 1, color: "gray", lineHeight: "body", mb: 4, display: "block" }}
          >
            {config.description}
          </Text>
          <Text
            sx={{
              fontWeight: "bold",
              fontSize: 1,
              mb: 2,
              display: "block",
            }}
          >
            Contact
          </Text>
          <ul sx={{ listStyle: "none", p: 0, m: 0, fontSize: 1 }}>
            <li sx={{ mb: 1 }}>
              <a href="mailto:feedback@bosabosa.org" sx={{ color: "primary" }}>
                Email
              </a>
            </li>
            <li sx={{ mb: 1 }}>
              <a
                href="https://www.linkedin.com/in/bosabosa/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary" }}
              >
                LinkedIn
              </a>
            </li>
            <li sx={{ mb: 1 }}>
              <a
                href="https://keybase.io/omgthedds"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary" }}
              >
                Keybase
              </a>
            </li>
            <li sx={{ mb: 1 }}>
              <a
                href="https://github.com/dds"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary" }}
              >
                GitHub
              </a>
            </li>
          </ul>
        </aside>
        <Footer />
      </Grid>
    </Themed.root>
  )
}

export default Layout
