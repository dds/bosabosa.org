import Head from "next/head"
import config from "../site.config"

const makeTitle = (title, name) =>
  title === name ? title : `${title} — ${name}`

export default function Meta({
  title = config.title,
  description = config.description,
  image = "",
  url = config.url,
  children,
}) {
  const fullTitle = makeTitle(title, config.title)
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {children}
    </Head>
  )
}
