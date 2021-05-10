/** @jsx jsx */
import { jsx, Flex, Text } from "theme-ui"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const PageTemplate = ({ data, location }) => {
  const post = data.markdownRemark

  return (
    <Layout location={location} title={post.frontmatter.title}>
      <article className="post" itemScope itemType="http://schema.org/Article">
        <Flex as="header" sx={{ mr: 0, ml: `auto` }}>
          <Text sx={{ variant: `text.heading` }}>{post.frontmatter.date}</Text>
        </Flex>
        <Text
          as="section"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`