/** @jsxImportSource theme-ui */
import MDX from "@mdx-js/runtime"
import Link from "next/link"
import { Heading, Flex, Text } from "theme-ui"
import { Link as A } from "theme-ui"
import { getPostBySlug, getAllPosts } from "../../content"
import Meta from "../../components/meta"
import config from "../../site.config"

export default function BlogPostPage({ post }) {
  return (
    <div>
      <Meta
        title={post.title}
        description={post.description || post.excerpt}
        url={`${config.url}/news/${post.slug}`}
      />
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
            {!!post.nextPostSlug && (
              <Link href={`/news/${post.nextPostSlug}`} passHref>
                <A rel="prev">← {post.nextPostTitle}</A>
              </Link>
            )}
          </li>
          <li>
            {!!post.previousPostSlug && (
              <Link href={`/news/${post.previousPostSlug}`} passHref>
                <A rel="next">{post.previousPostTitle} →</A>
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
    "description",
    "date",
    "slug",
    "author",
    "content",
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
