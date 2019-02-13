import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../../components/layout'
import TeamListingPage from './team-listing'

const TeamListingContainer = ({ data }) => {
  return (
    <Layout>
      <TeamListingPage
        title={data.wagtail.personIndexPage.strapline}
        team={data.wagtail.personPages}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    wagtail {
      personIndexPage {
        strapline
      }
      personPages {
        firstName
        lastName
        slug
        role
        isSenior
        image {
          ...largeIconImage
        }
      }
    }
  }
`

TeamListingContainer.propTypes = {
  data: PropTypes.object,
}

export default TeamListingContainer
