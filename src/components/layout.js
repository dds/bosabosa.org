/** @jsx jsx */
import React from "react"
import { Box, Container, Heading, jsx } from "theme-ui"
import { Global } from "@emotion/react"

import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"
import SkipNavLink from "./skip-nav"

const Layout = ({ children, className = ``, title = `` }) => (
  <React.Fragment>
    <Global
      styles={theme => ({
        html: {
          padding: 0,
          margin: 0,
          WebkitTextSizeAdjust: `100%`,
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
    <SEO title={title} />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Header />
    <Container
      sx={{
        my: 0,
        mx: `auto`,
        py: `2.5rem`,
        px: `1.25rem`,
        maxWidth: `42rem`,
      }}
    >
      <Box id="skip-nav" className={className}>
        <Heading as="h1">{title}</Heading>
        {children}
      </Box>
    </Container>
    <Footer />
  </React.Fragment>
)

export default Layout
