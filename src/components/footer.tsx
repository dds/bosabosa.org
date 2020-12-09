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
        <b>{author.name}</b> &copy; {new Date().getFullYear()}. Made with&nbsp;
        <span className="heart">&nbsp;❤&nbsp;</span> &&nbsp;
        <a href="https://www.gatsbyjs.org/">Gatsby</a>
      </span>
    </footer>
  )
}

export default Footer
