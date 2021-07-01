const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})
module.exports = withMDX({
  pageExtensions: ["js", "md"],
  webpack: (config, { dev, isServer }) => {
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      }
    }
    if (!dev && isServer) {
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = { ...(await originalEntry()) }
        entries["./feed.js"] = "./feed.js"
        return entries
      }
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
