/** @jsx jsx */
import { jsx, Container, Heading, Text } from "theme-ui"
import { useStaticQuery, graphql, Link } from "gatsby"

const BlogRoll = ({ n }) => {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.nodes
  /*
   * - Year
   *   - Month{3}, Day, Title, Tags
   * */
  return (
    <Container fluid>
      <Heading>posts</Heading>
      <ol sx={{ listStyle: `none`, m: 0, px: 3, py: 4 }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug} sx={{ mb: 4 }}>
              <Heading
                as="h2"
                sx={{
                  m: 0,
                  color: `primary`,
                }}
              >
                <Link
                  to={post.fields.slug}
                  sx={{
                    color: `secondary`,
                    textDecoration: `none`,
                    ":hover,:focus": {
                      color: `primary`,
                      textDecoration: `underline`,
                    },
                  }}
                >
                  <span itemProp="headline">{title}</span>
                </Link>
              </Heading>
              <small sx={{ fontWeight: `bold` }}>{post.frontmatter.date}</small>
              <Text
                sx={{ pt: 3 }}
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </li>
          )
        })}
      </ol>
    </Container>
  )
}

export default BlogRoll

const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
