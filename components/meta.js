import Head from "next/head"
import theme from "../lib/theme"

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`

export default function ({
  title = "Theme Starter", // page title
  name = "Theme Starter", // site name
  description = "This website was bootstrapped with @lachlanjc’s Next.js Theme Starter.", // page description
  image = "", // social card image URL
  url = "https://next-theme-starter.vercel.app",
  children,
}) {}
//   <Helmet
//     htmlAttributes={{
//       lang,
//     }}
//     title={title}
//     titleTemplate={siteTitle ? `%s | ${siteTitle}` : null}
//     meta={[
//       {
//         name: `description`,
//         content: metaDescription,
//       },
//       {
//         property: `og:title`,
//         content: title,
//       },
//       {
//         property: `og:description`,
//         content: metaDescription,
//       },
//       {
//         property: `og:type`,
//         content: `website`,
//       },
//     ].concat(meta)}
//   />
