/** @jsx jsx */
import { Helmet } from "react-helmet"
import { Grid, Heading, Themed, jsx } from "theme-ui"
import "normalize.css"

import Footer from "./footer"
import Header from "./header"
import SeO from "./seo"
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

const Layout = ({ children, title = `` }) => (
  <Themed.root>
    <SeO title={title} />
    <Helmet>
      <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
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
        <Heading as="h1">{title}</Heading>
        {children}
      </main>
      <aside sx={{ gridArea: `aside` }}></aside>
      <Footer />
    </Grid>
  </Themed.root>
)

export default Layout
