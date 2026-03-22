/** @jsxImportSource theme-ui */
import { Container, Heading, Text } from "theme-ui"
import { Link as A } from "theme-ui"
import Link from "next/link"

export default function Blogroll({ posts }) {
  return (
    <Container fluid>
      <ol sx={{ listStyle: `none`, m: 0, px: 3, py: 4 }}>
        {posts.map((post, i) => {
          const title = post.title || post.slug

          return (
            <li
              key={post.slug}
              sx={{
                mb: 4,
                pb: 4,
                borderBottom: i < posts.length - 1 ? `1px solid` : `none`,
                borderColor: `border`,
              }}
            >
              <Heading as="h2" sx={{ mb: 1 }}>
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
              <Text
                as="time"
                sx={{ display: `block`, fontSize: 1, color: `gray`, mb: 2 }}
              >
                {!!post.date && new Date(post.date).toLocaleDateString()}
              </Text>
              <Text
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
