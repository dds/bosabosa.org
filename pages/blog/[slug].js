import MDX from "@mdx-js/runtime"
import { Flex, Text } from "theme-ui"
import { getPostBySlug, getAllPosts } from "../../content"

export default function BlogPostPage({ post }) {
  const isLocal = process.env.NODE_ENV === "development"

  return (
    <div>
      <article sx={{ borderBottom: `1px solid` }}>
        <Flex as="header" sx={{ mr: 0, ml: `auto` }}>
          <Text sx={{ variant: `text.heading` }}>{post.title}</Text>
        </Flex>
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
          <li>← {!!post.previousPost && post.previousPost.slug}</li>
          <li>{!!post.nextPost && post.nextPost.slug} →</li>
        </ul>
      </nav>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
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
  const posts = getAllPosts(["slug"])
  return {
    paths: posts.map(post => {
      return {
        params: { ...post },
      }
    }),
    fallback: false,
  }
}
