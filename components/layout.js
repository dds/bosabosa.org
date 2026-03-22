/** @jsxImportSource theme-ui */
import { Grid, Text } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
import "normalize.css"

import config from "../site.config"
import Footer from "./footer"
import Header from "./header"
import SkipNavLink from "./skip-nav"

const layoutXS = `'header' 'aside' 'main' 'footer'`
const layoutS = layoutXS
const layoutM = `
      'header   header   header'
      'main     main     aside'
      'footer   footer   footer'`
const layoutL = `
      'header   header   header  header'
      '.        main     main    aside'
      'footer   footer   footer  footer'`

const Layout = ({ children }) => (
  <Themed.root>
    <SkipNavLink>Skip to content</SkipNavLink>
    <Grid
      sx={{
        height: `100vh`,
        gridTemplateAreas: [layoutXS, layoutS, layoutM, layoutL],
        gridTemplateColumns: ["1fr", "1fr", "1fr 50em 1fr", "1fr 50em 0 1fr"],
        gridTemplateRows: [
          "min-content min-content 1fr min-content",
          "min-content min-content 1fr min-content",
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
          maxWidth: `50em`,
          px: 3,
        }}
      >
        {children}
      </main>
      <aside sx={{ gridArea: `aside`, px: 3, py: 4 }}>
        <Text sx={{ fontWeight: "bold", fontSize: 3, mb: 2, display: "block" }}>
          {config.title}
        </Text>
        <Text sx={{ fontSize: 1, color: "gray", mb: 3, display: "block" }}>
          {config.author}
        </Text>
        <Text sx={{ fontSize: 1, color: "gray", lineHeight: "body" }}>
          {config.description}
        </Text>
      </aside>
      <Footer />
    </Grid>
  </Themed.root>
)

export default Layout
