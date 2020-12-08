const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const requiresTemplate = [`blog`, `projects`]

const getContentType = node =>
  node.fileAbsolutePath.match(/content(.*)/)[0].split(`/`)[1]

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const contentType = getContentType(node)
    const path = `content/${contentType}/`
    const { createNodeField } = actions
    const slug = createFilePath({ node, getNode, basePath: path })
    createNodeField({ node, name: `slug`, value: `/${contentType}${slug}` })
    if (requiresTemplate.includes(contentType)) {
      createNodeField({
        node,
        name: `templatePath`,
        value: `./src/templates/${contentType}-post.js`,
      })
    }
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // graphql function call returns a promise
  const { createPage } = actions
  const blogPostTemplate = path.resolve("src/templates/blog.js")
  const tagTemplate = path.resolve("src/templates/tags.js")
  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create post detail pages
  result.data.posts.edges.forEach(({ node }) => {
    const contentType = node.fields.slug.split(`/`)[1]
    if (requiresTemplate.includes(contentType)) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(node.fields.templatePath),
        context: {
          //   Data passed to context is available in page queries as graphql variables
          slug: node.fields.slug,
          templatePath: node.fields.templatePath,
        },
      })
    }
  })

  // Make tag pages
  result.data.tagsGroup.group.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
