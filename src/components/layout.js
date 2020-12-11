import React from "react"

import { Container } from "react-bootstrap"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => (
  <Container fluid className="global-wrapper">
    <Header />
    <main>{children}</main>
    <Footer />
  </Container>
)

export default Layout
