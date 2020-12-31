import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Contacts = () => {
  const { social } = useSiteMetadata()
  return (
    <ul>
      <li>
        Twitter:{" "}
        <a href={`https://twitter.com/${social?.twitter || ``}`}>
          {social?.twitter}
        </a>
      </li>
    </ul>
  )
}

export default Contacts
