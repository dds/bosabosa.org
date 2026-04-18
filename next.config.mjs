import bundleAnalyzer from "@next/bundle-analyzer"

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})
export default withBundleAnalyzer({
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
