import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const blog = ({ data }) => (
  <div>
    <Layout>
      <SEO title="Blog" />
      <h1>Blog</h1>
      {data.allMarkdownRemark.edges.map(post => (
        <div key={post.node.id}>
          <h3>{post.node.frontmatter.title}</h3>
          <small>
            Posted by {post.node.frontmatter.author} on{' '}
            {post.node.frontmatter.date}
          </small>
          <br />
          <br />
          <Link to={post.node.fields.slug}>Read More</Link>
          <br />
          <br />
          <hr />
        </div>
      ))}
    </Layout>
  </div>
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date
            author
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default blog
