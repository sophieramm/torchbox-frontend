// Vendor Modules
import React from 'react'

import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
// Components
import BlogListingPage from './blog-listing'
import Layout from '@components/layout'

const BlogsListingContainer = ({ data }) => {
  return (
    <Layout seoTitle={data.wagtail.blogIndexPage.pageTitle}>
      <BlogListingPage
        title={data.wagtail.blogIndexPage.title}
        blogs={data.wagtail.blogPosts}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    wagtail {
      blogIndexPage {
        pageTitle
        title
      }
      blogPosts {
        slug
        title
        date
        contact {
          ...contactSnippet
        }
        tags: relatedServices {
          name
          slug
        }
        authors {
          name
          personPage {
            slug
            role
            image {
              ...iconImage
            }
          }
        }
      }
    }
  }
`

BlogsListingContainer.propTypes = {
  data: PropTypes.object,
}

export default BlogsListingContainer
