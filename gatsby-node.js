const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve(`./src/templates/blog-post.js`)

  const blogQuery = await graphql(
    `
      {
        posts: allMdx(
          filter: { fields: { sourceName: { eq: "blog" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
        tagsGroup: allMdx(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (blogQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogQuery.errors
    )
    return
  }

  const blogPosts = blogQuery.data.posts.edges
  blogPosts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : blogPosts[index - 1].node.id
    const nextPostId =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node.id

    createPage({
      path: post.node.fields.slug,
      component: blogTemplate,
      context: {
        id: post.node.id,
        previousPostId,
        nextPostId,
      },
    })
  })

  // Extract tag data from query
  const tags = blogQuery.data.tagsGroup.group
  const tagsTemplate = path.resolve(`./src/templates/tags.js`)
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagsTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const pageQuery = await graphql(
    `
      {
        posts: allMdx(
          filter: { fields: { sourceName: { eq: "pages" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
        tagsGroup: allMdx(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (pageQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      pageQuery.errors
    )
    return
  }

  const pages = pageQuery.data.posts.edges
  pages.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: pageTemplate,
      context: {
        id: post.node.id,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type != `Mdx`) {
    return
  }

  const fileNode = getNode(node.parent)

  createNodeField({
    node,
    name: "sourceName",
    value: fileNode.sourceInstanceName,
  })

  var value = createFilePath({ node, getNode })
  if (fileNode.sourceInstanceName === `blog`) {
    value = `/b` + value
  }

  createNodeField({
    node,
    name: `slug`,
    value,
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Mdx frontmatter
  // This way the "Mdx" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
