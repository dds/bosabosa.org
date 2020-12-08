import { Link } from "gatsby"
import React from "react"
import { Container } from "react-bootstrap"
import Navbar from "./navbar.js"

const Header = () => {
  return (
    <Container fluid className="px-0">
      <Navbar />
    </Container>
  )
}

export default Header
