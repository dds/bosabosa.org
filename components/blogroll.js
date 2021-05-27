/** @jsxImportSource theme-ui */
import { Container, Heading, Link, Text } from "theme-ui"

export default function ({ n }) {
  return (
    <Container fluid>
      <Heading>posts</Heading>
      <ol sx={{ listStyle: `none`, m: 0, px: 3, py: 4 }}>
        {/* {posts.map(post => { */}
        {/*   const title = post.frontmatter.title || post.fields.slug */}

        {/*   return ( */}
        {/*     <li key={post.fields.slug} sx={{ mb: 4 }}> */}
        {/*       <Heading as="h2"> */}
        {/*         <Link */}
        {/*           href={post.fields.slug} */}
        {/*           sx={{ */}
        {/*             textDecoration: `none`, */}
        {/*             ":hover,:focus": { */}
        {/*               textDecoration: `underline`, */}
        {/*             }, */}
        {/*           }} */}
        {/*         > */}
        {/*           {title} */}
        {/*         </Link> */}
        {/*       </Heading> */}
        {/*       <Text>{post.frontmatter.date}</Text> */}
        {/*       <Text */}
        {/*         sx={{ pt: 3 }} */}
        {/*         dangerouslySetInnerHTML={{ */}
        {/*           __html: post.frontmatter.description || post.excerpt, */}
        {/*         }} */}
        {/*       /> */}
        {/*     </li> */}
        {/*   ) */}
        {/* })} */}
      </ol>
    </Container>
  )
}
