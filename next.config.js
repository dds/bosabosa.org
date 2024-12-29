const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
module.exports = withBundleAnalyzer(
  withMDX({
    output: "standalone",
    pageExtensions: ["js", "md"],
    webpack: (config, { dev, isServer }) => {
      // Fixes npm packages (mdx) that depend on `fs` module
      if (!isServer) {
        config.resolve.fallback.fs = false
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
)
