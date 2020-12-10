import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const query = graphql`
    query Author {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `
  const { author } = useStaticQuery(query).site.siteMetadata
  return (
    <footer className="footer text-muted text-center">
      <span className="m-auto">
        <b>{author.name}</b> &copy; {new Date().getFullYear()}
      </span>
    </footer>
  )
}

export default Footer
