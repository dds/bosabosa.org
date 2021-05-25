/** @jsx jsx */
import { jsx, Flex, Text } from "theme-ui"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const { previous, next } = data

  return (
    <Layout location={location} title={post.frontmatter.title}>
      <article
        itemScope
        itemType="http://schema.org/Article"
        sx={{ borderBottom: `1px solid` }}
      >
        <Flex as="header" sx={{ mr: 0, ml: `auto` }}>
          <Text sx={{ variant: `text.heading` }}>{post.frontmatter.date}</Text>
        </Flex>
        <Text as="section" itemProp="articleBody">
          <MDXRenderer>{post.body}</MDXRenderer>
        </Text>
      </article>
      <nav sx={{ pt: 2 }}>
        <ul
          sx={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            p: 0,
            m: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
