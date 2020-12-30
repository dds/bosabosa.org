/** @jsx jsx */
import { jsx, Heading, Text } from "theme-ui"
import { Container } from "react-bootstrap"
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
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug} css={{ "margin-bottom": 0 }}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header css={{ "margin-bottom": `1rem` }}>
                  <Heading
                    as="h2"
                    sx={{
                      color: `primary`,
                    }}
                    css={{
                      "margin-bottom": `0.75rem`,
                      "margin-top": `2rem`,
                    }}
                  >
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </Heading>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
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
        }
      }
    }
  }
`
