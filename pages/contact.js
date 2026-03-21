import fs from "fs"
import path from "path"
import { MDXRemote } from "next-mdx-remote"
import Meta from "../components/meta"

export default function Contact({ mdxSource }) {
  return (
    <>
      <Meta title="Contact" />
      <MDXRemote {...mdxSource} />
    </>
  )
}

export async function getStaticProps() {
  const source = fs.readFileSync(
    path.join(process.cwd(), "content", "contact.md"),
    "utf8"
  )
  const { serialize } = await import("next-mdx-remote/serialize")
  const remarkGfm = (await import("remark-gfm")).default
  const remarkMath = (await import("remark-math")).default
  const rehypePrettyCode = (await import("rehype-pretty-code")).default
  const rehypeKatex = (await import("rehype-katex")).default
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: { dark: "gruvbox-dark-medium", light: "gruvbox-light-medium" },
            keepBackground: false,
          },
        ],
        rehypeKatex,
      ],
    },
  })
  return { props: { mdxSource } }
}
