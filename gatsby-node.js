/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })

  // return graphql(`
  //   {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           html
  //           id
  //           frontmatter {
  //             path
  //             title
  //             date
  //             author
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).then(res => {
  //   if (res.errors) {
  //     return Promise.reject(res.errors)
  //   }

  //   res.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //     createPage({
  //       path: node.frontmatter.path,
  //       component: postTemplate,
  //     })
  //   })
  // })
}
