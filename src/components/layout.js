/** @jsx jsx */
import React from "react"
import { Helmet } from "react-helmet"
import { Grid, Heading, jsx } from "theme-ui"
import { Global } from "@emotion/react"

import Footer from "./footer"
import Header from "./header"
import SeO from "./seo"
import SkipNavLink from "./skip-nav"

const phoneLayout = `'header' 'main' 'aside' 'footer'`
const tabletLayout = `
      'header   header  header'
      'aside    aside   aside'
      'main     main    main'
      'footer   footer  footer'`
const desktopLayout = `
      'header   header   header  header'
      '.        main     main    aside'
      'footer   footer   footer  footer'`

const Layout = ({ children, title = `` }) => (
  <React.Fragment>
    <Global
      styles={theme => ({
        html: {
          WebkitTextSizeAdjust: `100%`,
        },
        body: {
          padding: 0,
          margin: 0,
        },
        "*": {
          boxSizing: `inherit`,
        },
        img: {
          borderStyle: `none`,
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        "[hidden]": {
          display: `none`,
        },
        "::selection": {
          backgroundColor: theme.colors.text,
          color: theme.colors.background,
        },
        a: {
          transition: `all 0.3s ease-in-out`,
          color: theme.colors.secondary,
        },
      })}
    />
    <SeO title={title} />
    <Helmet>
      <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
    <SkipNavLink>Skip to content</SkipNavLink>
    <Grid
      sx={{
        height: `100vh`,
        gridTemplateAreas: [phoneLayout, tabletLayout, desktopLayout],
        gridTemplateColumns: ["1fr", "1fr 2fr 1fr", "1fr 2fr 1fr 1fr"],
        gridTemplateRows: [
          "min-content 1fr min-content min-content",
          "min-content 1fr min-content min-content",
          "min-content 1fr min-content",
        ],
      }}
    >
      <Header />
      <main
        id="skip-nav"
        sx={{
          gridArea: `main`,
        }}
      >
        <Heading as="h1">{title}</Heading>
        {children}
      </main>
      <aside sx={{ gridArea: `aside` }}></aside>
      <Footer />
    </Grid>
  </React.Fragment>
)

export default Layout
