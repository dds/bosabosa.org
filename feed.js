const Feed = require(`feed`).Feed
const fs = require(`fs`)
const config = require(`./site.config`)

module.exports = {
  genFeeds: () => {
    if (process.env.NODE_ENV === "development") {
      return
    }

    const date = new Date()
    const feedConfig = Object.assign(
      {
        id: config.url,
        link: config.url,
        // image: `${baseUrl}/images/logo.svg`,
        // favicon: `${baseUrl}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, ${
          config.author
        }.`,
        updated: date,
        generator: "Next.js using Feed for Node.js",
        feedLinks: {
          rss2: `${config.url}/rss.xml`,
          atom: `${config.url}/atom.xml`,
          json: `${config.url}/feed.json`,
        },
      },
      config
    )
    const feed = new Feed(feedConfig)

    const posts = []
    posts.forEach(post => {})
    fs.writeFileSync(`./public/rss.xml`, feed.rss2())
  },
}
