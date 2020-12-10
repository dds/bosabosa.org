import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { Container } from "react-bootstrap"
import Header from "./header"
import Footer from "./footer"

const style = css`
  // border: 1px solid red;
`

const Layout = ({ children }) => {
  return (
    <Container css={style} fluid className="global-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}

export default Layout
