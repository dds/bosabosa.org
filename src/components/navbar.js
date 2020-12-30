/** @jsx jsx */
import { jsx } from "theme-ui"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"

export default () => {
  return (
    <Navbar variant={toString()} fixed="top" collapseOnSelect expand="md">
      <Navbar.Collapse id="responsivenavbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/" title="Home">
            /
          </Nav.Link>
          <Nav.Link as={Link} to="/b" title="Blog">
            Blog
          </Nav.Link>
          <Nav.Link as={Link} to="/o" title="Other">
            Other
          </Nav.Link>
          <Nav.Link as={Link} to="/tags" title="Tags">
            Tags
          </Nav.Link>
          <Nav.Link as={Link} to="/a" title="About">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
