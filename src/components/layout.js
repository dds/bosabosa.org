/** @jsx jsx */
import React from "react"
import { Box, Container, jsx } from "theme-ui"
import { Global } from "@emotion/core"

import CodeStyles from "../styles/code"
import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"
import SkipNavLink from "./skip-nav"

const Layout = ({ children, className = ``, title = `` }) => (
  <React.Fragment>
    <Global
      styles={theme => ({
        "*": {
          boxSizing: `inherit`,
        },
        html: {
          WebkitTextSizeAdjust: `100%`,
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
    <SEO title={title} />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container
      css={{
        margin: `0 auto`,
        "max-width": `42rem`,
        padding: `2.5rem 1.25rem`,
      }}
    >
      <Header title={title} />
      <Box id="skip-nav" sx={{ ...CodeStyles }} className={className}>
        {children}
      </Box>
      <Footer />
    </Container>
  </React.Fragment>
)

export default Layout
