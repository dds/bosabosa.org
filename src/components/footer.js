import React from "react"

import { useSiteMetadata } from "../hooks/use-site-metadata"

const Footer = () => {
  const { author } = useSiteMetadata()
  return (
    <footer className="footer text-muted text-center">
      <span className="m-auto">
        <b>{author.name}</b> &copy; {new Date().getFullYear()}
      </span>
    </footer>
  )
}

export default Footer
