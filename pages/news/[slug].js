/** @jsxImportSource theme-ui */
import { MDXRemote } from "next-mdx-remote"
import Link from "next/link"
import { Heading, Flex, Text } from "theme-ui"
import { Link as A } from "theme-ui"
import { getPostBySlug, getAllPosts } from "../../content"
import Meta from "../../components/meta"
import useKeyboardNav from "../../components/use-keyboard-nav"
import config from "../../site.config"

export default function BlogPostPage({ post, mdxSource }) {
  useKeyboardNav({
    left: post.nextPostSlug ? `/news/${post.nextPostSlug}` : null,
    right: post.previousPostSlug ? `/news/${post.previousPostSlug}` : null,
    escape: `/news`,
  })

  return (
    <div>
      <Meta
        title={post.title}
        description={post.description || post.excerpt}
        url={`${config.url}/news/${post.slug}`}
      />
      <Heading as="h1">{post.title}</Heading>
      <article sx={{ borderBottom: `1px solid`, borderColor: `border` }}>
        {post.date && (
          <Text
            as="time"
            sx={{ display: `block`, fontSize: 1, color: `gray`, mb: 3 }}
          >
            {new Date(post.date).toLocaleDateString()}
          </Text>
        )}
        <MDXRemote {...mdxSource} />
      </article>
      <nav sx={{ mt: 3 }}>
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
  const { serialize } = await import("next-mdx-remote/serialize")
  const mdxSource = await serialize(post.content)
  const { content, ...postMeta } = post
  return {
    props: { post: postMeta, mdxSource },
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
