// Vendor Modules
import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import cssVars from 'css-vars-ponyfill'
// Components
import Header from '@components/header'
import Footer from '@components/footer'
import TeaserBlock from '@components/teaser-block'
import ThemeProvider from '@components/theme-provider'
// Utilities
import { safeGet } from '@utils/safeget'
import { blogsUrl, caseStudiesUrl, teamUrl } from '@utils/urls'
// Styles
import '@styles/_fonts.scss'
import styles from './layout.module.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentUrl: '#1' }
  }

  componentDidMount() {
    // Fix IE11 so that themeing works
    if (typeof window !== `undefined`) {
      cssVars({
        watch: true,
      })
    }
  }

  render() {
    const {
      children,
      headerShouldCollapse,
      title,
      nestedLinks,
      ignoreServiceTeaser,
      theme,
    } = this.props

    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            wagtail {
              jobsIndexPage {
                jobs {
                  url
                }
              }
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <Header
              title={title}
              currentUrl={this.state.currentUrl}
              shouldCollapse={headerShouldCollapse}
              links={this.renderLinks(data)}
              nestedLinks={nestedLinks}
              navigateTo={url => {
                this.setState({ currentUrl: url })
              }}
            />
            <div className={styles.pageContainer}>
              {children}
              <TeaserBlock
                title={`More from Torchbox...`}
                ignoreSlug={ignoreServiceTeaser}
              />
              <Footer
                links={[
                  {
                    label: 'Blog',
                    href: blogsUrl(),
                  },
                  {
                    label: 'Work',
                    href: caseStudiesUrl(),
                  },
                  {
                    label: 'Team',
                    href: teamUrl(),
                  },
                  {
                    label: 'Privacy',
                    href: '/privacy',
                  },
                  {
                    label: 'Cookies',
                    href: '/cookies',
                  },
                ]}
              />
            </div>
          </ThemeProvider>
        )}
      />
    )
  }

  renderLinks = data => {
    return [
      {
        href: '',
        title: 'Design + build products',
        strap: 'For digital design and engineering services',
      },
      {
        href: 'wagtail-cms',
        title: 'Wagtail CMS services',
        strap: 'For web builds with the Wagtail open source CMS',
      },
      {
        href: 'digital-marketing',
        title: 'Digital marketing',
        strap: 'For our data driven digital marketing services',
      },
      {
        href: 'culture-and-jobs',
        title: 'Culture + jobs',
        strap: 'For our data driven digital marketing services',
        badge: safeGet(data, 'wagtail.jobsIndexPage.jobs.length', 0),
      },
    ].map(link => {
      if (typeof window !== `undefined`) {
        if (window.location.pathname.replace(/\//g, '') === link.href) {
          return {
            ...link,
            active: true,
          }
        }
      }
      return link
    })
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  nestedLinks: PropTypes.array,
  headerShouldCollapse: PropTypes.bool,
  theme: PropTypes.string,
  title: PropTypes.string,
  ignoreServiceTeaser: PropTypes.string,
}

Layout.defaultProps = {
  headerShouldCollapse: false,
  darkTheme: false,
}

export default Layout
