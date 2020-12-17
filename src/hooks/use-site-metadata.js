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
            social {
              twitter
              facebook
              linkedin
              reddit
              keybase
              email
            }
            sourceUrl
          }
        }
      }
    `
  )
  return site.siteMetadata
}
