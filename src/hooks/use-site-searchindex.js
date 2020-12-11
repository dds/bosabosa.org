import { useStaticQuery, graphql } from "gatsby"
export const useSiteSearchIndex = () => {
  const { siteSearchIndex } = useStaticQuery(
    graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `
  )
  return siteSearchIndex.index
}
