/** @jsx jsx */
import { jsx } from "theme-ui"

import Contact from "./contact"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Footer = () => {
  const { author } = useSiteMetadata()
  return (
    <footer className="footer text-muted text-center">
      <span>
        <b>{author.name}</b> &copy; {new Date().getFullYear()}
      </span>
      <Contact />
    </footer>
  )
}

export default Footer
