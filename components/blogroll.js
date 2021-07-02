/** @jsxImportSource theme-ui */
import { Container, Heading, Text } from "theme-ui"
import { Link as A } from "theme-ui"
import Link from "next/link"

export default function Blogroll({ posts }) {
  return (
    <Container fluid>
      <Heading>posts</Heading>
      <ol sx={{ listStyle: `none`, m: 0, px: 3, py: 4 }}>
        {posts.map(post => {
          const title = post.title || post.slug

          return (
            <li key={post.slug} sx={{ mb: 4 }}>
              <Heading as="h2">
                <Link href={`/news/${encodeURIComponent(post.slug)}`} passHref>
                  <A
                    sx={{
                      textDecoration: `none`,
                      ":hover,:focus": {
                        textDecoration: `underline`,
                      },
                    }}
                  >
                    {title}
                  </A>
                </Link>
              </Heading>
              <Text>{!!post.date && post.date.toLocaleDateString()}</Text>
              <Text
                sx={{ pt: 3 }}
                dangerouslySetInnerHTML={{
                  __html: post.description || post.excerpt,
                }}
              />
            </li>
          )
        })}
      </ol>
    </Container>
  )
}
