import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            siteUrl
            description
            author {
              name
              summary
            }
            sourceUrl
            social {
              linkedin
              keybase
              email
            }
            paths {
              blog
              posts
              tags
            }
            showLineNumbers
            showCopyButton
            dateFormat
          }
        }
      }
    `
  )
  return site.siteMetadata
}
