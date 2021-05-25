module.exports = {
  siteMetadata: {
    title: `bosabosa`,
    author: {
      name: `David D. Smith`,
    },
    description: `David D. Smith's Writing`,
    siteUrl: `https://dds.bosabosa.org/`,
    sourceUrl: `https://github.com/dds/bosabosa.org/`,
    social: {
      disqus: ``,
      email: `root@bosabosa.org`,
      facebook: `omgthedds`,
      keybase: `omgthedds`,
      linkedin: `bosabosa`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fields: { sourceName: { eq: "blog" } } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "David D. Smith's Writing",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        short_name: `bosabosa`,
        name: `David D. Smith's Writing`,
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
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            slug: node => node.fields.slug,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: {},
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {},
    },
  ],
}
