const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
module.exports = withBundleAnalyzer({
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
