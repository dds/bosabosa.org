/** @jsx jsx */
import React from "react"
import { Box, Container, Heading, jsx } from "theme-ui"
import { Global } from "@emotion/react"

import Footer from "./footer"
import Header from "./header"
import SeO from "./seo"
import SkipNavLink from "./skip-nav"

const Layout = ({ children, className = ``, title = `` }) => (
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
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container sx={{ position: `relative`, minHeight: `100vh` }}>
      <Header />
      <Container
        sx={{
          my: 0,
          mx: `auto`,
          py: `2.5rem`,
          px: `1.25rem`,
          maxWidth: `48rem`,
        }}
      >
        <Box id="skip-nav" className={className}>
          <Heading as="h1">{title}</Heading>
          {children}
        </Box>
      </Container>
      <Footer />
    </Container>
  </React.Fragment>
)

export default Layout
