/** @jsxImportSource theme-ui */
import MDX from "@mdx-js/runtime"
import Link from "next/link"
import { Heading, Flex, Text } from "theme-ui"
import { Link as A } from "theme-ui"
import { getPostBySlug, getAllPosts } from "../../content"

export default function BlogPostPage({ post }) {
  const isLocal = process.env.NODE_ENV === "development"

  return (
    <div>
      <Heading as="h1">{post.title}</Heading>
      <article sx={{ borderBottom: `1px solid` }}>
        {post.date && (
          <Flex as="header" sx={{ fontWeight: 4, mr: 0, ml: `auto` }}>
            <Text sx={{ variant: `text.heading` }}>
              {new Date(post.date).toLocaleDateString()}
            </Text>
          </Flex>
        )}
        <MDX>{post.content}</MDX>
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
            {!!post.previousPostSlug && (
              <Link href={post.previousPostSlug} passHref>
                <A rel="prev">← {post.previousPostTitle}</A>
              </Link>
            )}
          </li>
          <li>
            {!!post.nextPostSlug && (
              <Link href={post.nextPostSlug} passHref>
                <A rel="next">→ {post.nextPostTitle}</A>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug, [
    "title",
    "excerpt",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "coverImageAlt",
    "coverImageHeight",
    "coverImageWidth",
    "draft",
  ])
  return {
    props: { post },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(["slug"])
  return {
    paths: posts.map(post => {
      return {
        params: { ...post },
      }
    }),
    fallback: false,
  }
}
