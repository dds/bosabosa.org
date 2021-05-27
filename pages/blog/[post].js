/** @jsxImportSource theme-ui */
import { Flex, Text } from "theme-ui"

const BlogPostTemplate = () => {
  return (
    <div>
      <article sx={{ borderBottom: `1px solid` }}>
        <Flex as="header" sx={{ mr: 0, ml: `auto` }}>
          <Text sx={{ variant: `text.heading` }}>$header</Text>
        </Flex>
        <Text as="section" />
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
          <li>← $previous</li>
          <li>$next →</li>
        </ul>
      </nav>
    </div>
  )
}

export default BlogPostTemplate
