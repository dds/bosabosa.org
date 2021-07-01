const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})
module.exports = withMDX({
  pageExtensions: ["js", "md"],
  webpack: (config, { isServer }) => {
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      }
    } else {
      const { genFeeds } = require(`./feed`)
      genFeeds()
    }
    return config
  },
  async redirects() {
    return [
      {
        source: `/b`,
        destination: `/news`,
        permanent: true,
      },
      {
        source: `/b/:slug`,
        destination: `/news/:slug`,
        permanent: true,
      },
    ]
  },
})
