import React, { useContext } from "react"
import ThemeContext from "./theme"
import { Navbar, Nav, Form } from "react-bootstrap"
import { Link } from "gatsby"
// import "./fontawesome.js"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default () => {
  const { dark, toggleDark, toString } = useContext(ThemeContext)
  return (
    <Navbar variant={toString()} fixed="top" collapseOnSelect expand="md">
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className="pr-3 mr-4 nav-links">
          <Nav.Link className="ml-2" as={Link} to="/a" title="About">
            About
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/b" title="Blog">
            Blog
          </Nav.Link>
          {/* <Nav.Link className="ml-2" as={Link} to="/software" title="Software"> */}
          {/*   Software */}
          {/* </Nav.Link> */}
          {/* <Nav.Link className="ml-2" as={Link} to="/hikes" title="Hikes"> */}
          {/*   Hikes */}
          {/* </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
