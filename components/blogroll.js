/** @jsxImportSource theme-ui */
import { Container, Heading, Text, Flex } from "theme-ui"
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
              <Flex>
                <Heading as="h2">
                  <Link
                    href={`/news/${encodeURIComponent(post.slug)}`}
                    passHref
                  >
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
                <Heading as="small" sx={{ ml: `auto` }}>
                  {!!post.date && new Date(post.date).toLocaleDateString()}
                </Heading>
              </Flex>
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
