module.exports = {
  siteMetadata: {
    title: `bosabosa`,
    author: {
      name: `David D Smith`,
      summary: `coder, creator, in California.`,
    },
    description: `blog of unmanageable tech and hair`,
    siteUrl: `https://dds.bosabosa.org/`,
    sourceUrl: `https://github.com/dds/bosabosa.org/`,
    social: {
      disqus: ``,
      email: `root@bosabosa.org`,
      facebook: `omgthedds`,
      keybase: `omgthedds`,
      linkedin: `bosabosa`,
      reddit: `kuma`,
      twitter: `exponent`,
    },
    paths: {
      blog: `/b`,
      posts: `/`,
      tags: `/tags`,
    },
    externalLinks: [{}],
    showLineNumbers: true,
    showCopyButton: true,
    dateFormat: `YYYY.MM.DD`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-orga`,
      options: {
        // if you don't want to have server side prism code highlight
        // noHighlight: true,
      },
    },
    `gatsby-plugin-remove-generator`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/mdx-layout.js"),
        },
        extensions: [".md", ".mdx"],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed-mdx`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        short_name: `bosabosa`,
        name: `dds's blog of unmanageable tech and hair`,
        start_url: `/?source=pwa`,
        scope: `/`,
        display: `standalone`,
        icons: [
          {
            src: `/icon-192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/icon-512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type Mdx, list how to resolve the fields` values
          Mdx: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            slug: node => node.fields.slug,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-remove-fingerprints`,
  ],
}
