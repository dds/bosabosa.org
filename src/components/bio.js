/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { jsx } from "theme-ui"

const Bio = () => {
  const data = useStaticQuery(query)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <div>
          <div>
            <p>
              Written by <strong>{author.name}</strong>{" "}
              {author?.summary || null}
              {` `}
            </p>
          </div>
          <div>
            <p>
              I've been a computer geek since I can remember. My first computer
              was an Apple IIe that I used in third grade at school. Soon after,
              my dad purchased one for my older brother and I to share. We
              played a game called{" "}
              <a href="https://archive.org/details/Lemonade_Stand_1979_Apple">
                Lemonade Stand
              </a>{" "}
              a lot. I got a PC (a Zeos Pantera), saved up money for a C++
              compiler, put OS/2 Warp 2.1 on it, then Linux, and by then I was
              really hooked. Learned some graphics programming, game
              programming, went to college and learned some great maths and
              large scale systems programming.
            </p>
          </div>
          <div>
            <p>
              Then I took a break, went to live in Japan and learn the culture
              and language. For seven years, I spoke English rarely and tried to
              adjust to a very different life. I re-learned how to listen, how
              to speak, how to read, and how to write. I re-learned my place in
              society as an outsider and as a minority. I re-learned my place in
              the world as part of a global economy, a planet-scale enterprise,
              and a critical moment in our planet's history facing a new great
              extinction event from man-made climate change..
            </p>
          </div>
          <div>
            <p>
              While in Japan, I learned how much I love to walk and see
              beautiful things in this world. I moved to California and feel in
              love with the Sierra Nevada range. Now, whenever I can, I wish to
              spend time walking in those mountains.
            </p>
          </div>
          <div>
            <p>
              Today, I'm trying to re-learn more things. How can we solve some
              of the problems we've created over the years? How can we leave a
              better world to the next generation? How to grow from explorers
              and conquerors to care-takers and nurturers? How to achieve
              equity? How to be healthy in spirit and body, individually and
              collectively? I'm progressive because I care about fixing the
              problems of the past, not pretending things were great a long time
              ago. And I'm an optimist because I believe we will overcome.
            </p>
          </div>
          <div>
            <p>May all beings be well and happy.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio

const query = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          twitter
        }
      }
    }
  }
`
