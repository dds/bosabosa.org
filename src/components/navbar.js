import React, { useContext } from "react"
import ThemeContext from "./theme"
import { Navbar, Nav, Form } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
// import "./fontawesome.js"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
          sourceUrl
        }
      }
    }
  `)

  const { dark, toggledark, tostring } = useContext(ThemeContext)
  return (
    <Navbar variant={toString()} fixed="top" collapseOnSelect expand="md">
      <Navbar.Collapse
        id="responsivenavbar-nav"
        className="justify-content-end"
      >
        <Nav className="pr-3 mr-4 nav-links">
          <Nav.Link className="ml-2" as={Link} to="/" title="Home">
            /
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/b" title="Blog">
            Blog
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/o" title="Other">
            Other
          </Nav.Link>
          <a
            classname="ml-2"
            target="_blank"
            href={data.site.siteMetadata.sourceUrl}
            title="Source on github"
          >
            Source
          </a>
          <Nav.Link className="ml-2" as={Link} to="/a" title="About">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}