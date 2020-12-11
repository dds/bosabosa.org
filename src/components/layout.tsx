import * as React from "react"
import { Container } from "react-bootstrap"
import Header from "./header"
import Footer from "./footer"

const Layout: React.FC = ({ children }) => (
  <Container fluid className="global-wrapper">
    <Header />
    <main>{children}</main>
    <Footer />
  </Container>
)

export default Layout
