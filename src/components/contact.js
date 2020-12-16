import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Contacts = () => {
  const { social } = useSiteMetadata()
  return (
    <Container>
      <ul>
        <li>
          Twitter:{" "}
          <Link to={`https://twitter.com/${social?.twitter || ``}`}>
            {social?.twitter}
          </Link>
        </li>
      </ul>
    </Container>
  )
}

export default Contacts
