/** @jsx jsx */
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"
import { jsx } from "theme-ui"

import { useSiteMetadata } from "../hooks/use-site-metadata"

export default () => {
  const { sourceUrl } = useSiteMetadata()

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
          <a
            target="_blank"
            rel="noreferrer"
            href={sourceUrl}
            title="Source on github"
          >
            Source
          </a>
          <Nav.Link as={Link} to="/a" title="About">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
