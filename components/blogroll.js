/** @jsxImportSource theme-ui */
import { Container, Heading, Link, Text } from "theme-ui"

export default function Blogroll({ posts }) {
  return (
    <Container fluid>
      <Heading>posts</Heading>
      <ol sx={{ listStyle: `none`, m: 0, px: 3, py: 4 }}>
        {posts.map(frontmatter => {
          const title = frontmatter.title || frontmatter.slug

          return (
            <li key={frontmatter.slug} sx={{ mb: 4 }}>
              <Heading as="h2">
                <Link
                  href={frontmatter.slug}
                  sx={{
                    textDecoration: `none`,
                    ":hover,:focus": {
                      textDecoration: `underline`,
                    },
                  }}
                >
                  {title}
                </Link>
              </Heading>
              <Text>{frontmatter.date}</Text>
              <Text
                sx={{ pt: 3 }}
                dangerouslySetInnerHTML={{
                  __html: frontmatter.description || frontmatter.excerpt,
                }}
              />
            </li>
          )
        })}
      </ol>
    </Container>
  )
}
