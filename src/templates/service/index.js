// Vendor Modules
import React from 'react'
import { graphql } from 'gatsby'
// Components
import ServicePage from './service-page'
import Layout from '@components/layout'
// Utilities
import { blogListing, caseStudyListing } from '@utils/selectors'
import {
  caseStudiesUrl,
  caseStudiesFilterUrl,
  blogsUrl,
  blogsFilterUrl,
  pageUrl
} from '@utils/urls'
import { safeGet } from '@utils/safeget'

export default ({ data, location, pageContext }) => {
  let blocks = pageContext.blocks || [
    'hero-block',
    'help-block',
    'testimonials-block',
    'process-block',
    'case-studies-block',
    'blogs-block',
    'contact-detailed',
  ]

  let page
  if (data.wagtail.subServicePages) {
    page = data.wagtail.subServicePages[0]
  } else {
    page = data.wagtail.servicePages[0]
  }

  if (page) {
    let nestedNav = []
    ;[
      'keyPointsSectionTitle',
      'testimonialsSectionTitle',
      'caseStudiesSectionTitle',
      'blogsSectionTitle',
    ].map(id => {
      const sectionTitle = page[id]
      if (sectionTitle) {
        nestedNav.push({
          title: sectionTitle,
          href: `#section=${sectionTitle}`,
        })
      }
    })

    blocks = blocks.map(block => {
      switch (block) {
        case 'hero-block':
          return page.strapline || page.intro
            ? {
                type: 'hero-block',
                data: {
                  excludeFromLinks: true,
                  sectionTitle: 'hero',
                  strapline: page.strapline,
                  intro: page.intro,
                  links: nestedNav,
                  greetingImageType: page.greetingImageType,
                  parentLink: (page.slug !== page.service.slug) ? page.service : null,
                },
              }
            : {}

        case 'help-block':
          return page.keyPoints.length
            ? {
                type: 'help-block',
                data: {
                  sectionTitle: page.keyPointsSectionTitle,
                  heading: page.headingForKeyPoints,
                  links: page.keyPoints.map(keyPoint => ({
                    title: keyPoint.text,
                    href: keyPoint.linkedPage
                      ? pageUrl({
                        ...keyPoint.linkedPage,
                        serviceSlug: page.service.slug
                      })
                      : null,
                  })),
                  contact: page.contact,
                },
              }
            : {}

        case 'testimonials-block':
          let logos = pageContext.countryCode === 'US' ? page.usaClientLogos : page.clientLogos;
          return logos.length || page.testimonials.length
            ? {
                type: 'testimonials-block',
                data: {
                  sectionTitle: page.testimonialsSectionTitle,
                  logos: logos,
                  testimonials: page.testimonials,
                },
              }
            : {}

        case 'process-block':
          return page.useProcessBlockImage
            ? {
                type: 'process-image-block',
                data: {
                  sectionTitle: page.processSectionTitle,
                  title: page.headingForProcesses || '',
                },
              }
            : page.processes.length
            ? {
                type: 'process-block',
                data: {
                  sectionTitle: page.processSectionTitle,
                  title: page.headingForProcesses,
                  processes: page.processes.map(process => {
                    return {
                      ...process,
                      pageLink: {
                        ...process.pageLink,
                        serviceSlug: page.service.slug
                      }
                    }
                  }),
                },
              }
            : {}

        case 'case-studies-block':
          return page.caseStudies
            ? {
                type: 'case-studies-block',
                data: {
                  sectionTitle: page.caseStudiesSectionTitle,
                  caseStudies: page.caseStudies.map(caseStudyListing),
                  listingUrl: caseStudiesFilterUrl(page.service.slug),
                },
              }
            : {}

        case 'blogs-block':
          return page.blogPosts
            ? {
                type: 'blogs-block',
                data: {
                  sectionTitle: page.blogsSectionTitle,
                  blogs: page.blogPosts.map(blogListing),
                  listingUrl: blogsFilterUrl(page.service.slug),
                },
              }
            : {}

        case 'contact-detailed':
          return true
            ? {
                type: 'contact-detailed',
                data: {
                  contact: page.contact,
                  contactReasons: page.contactReasons
                },
              }
            : {}

        default:
          return {}
      }
    })
    return (
      <ServicePage
        location={location}
        title={page.title}
        seoTitle={page.pageTitle}
        seoDesc={page.searchDescription}
        theme={page.theme}
        blocks={blocks}
        serviceSlug={page.service.slug}
        nestedNav={nestedNav}
      />
    )
  } else {
    return null
  }
}

export const query = graphql`
  query($slug: String) {
    wagtail {
      servicePages(slug: $slug) {
        title
        pageTitle
        searchDescription
        slug
        theme
        strapline
        intro
        greetingImageType

        keyPointsSectionTitle
        headingForKeyPoints
        keyPoints {
          text
          linkedPage {
            type
            slug
          }
        }

        contact {
          ...contactSnippet
        }
        contactReasons {
          ...contactReasonsSnippet
        }

        testimonialsSectionTitle
        clientLogos {
          image {
            ...quarterImage
          }
        }
        usaClientLogos {
          image {
            ...quarterImage
          }
        }
        testimonials {
          name
          quote
          role
        }

        service {
          name
          slug
          servicePage {
            type
            slug
          }
        }

        headingForProcesses
        useProcessBlockImage
        processSectionTitle
        processes {
          title
          description
          pageLinkLabel
          pageLink {
            type
            slug
          }
        }

        caseStudiesSectionTitle
        caseStudies(limit: 4) {
          title
          slug
          client
          listingSummary
          feedImage {
            ...fullImage
          }
          homepageImage {
            ...fullImage
          }
        }

        blogsSectionTitle
        blogPosts(limit: 5) {
          title
          slug
          listingSummary
          authors {
            name
            personPage {
              role
              image {
                ...iconImage
              }
            }
          }
        }
      }
    }
  }
`

export const previewQuery = `
  query($previewToken: String) {
    servicePages(previewToken: $previewToken) {
      title
      pageTitle
      searchDescription
      slug
      theme
      strapline
      intro
      greetingImageType

      keyPointsSectionTitle
      headingForKeyPoints
      keyPoints {
        text
        linkedPage {
          type
          slug
        }
      }

      contact {
        ...contactSnippet
      }
      contactReasons {
        ...contactReasonsSnippet
      }

      testimonialsSectionTitle
      clientLogos {
        image {
          ...quarterImage
        }
      }
      usaClientLogos {
        image {
          ...quarterImage
        }
      }
      testimonials {
        name
        quote
        role
      }

      headingForProcesses
      useProcessBlockImage
      processSectionTitle
      processes {
        title
        description
        pageLinkLabel
        pageLink {
          type
          slug
        }
      }

      caseStudiesSectionTitle
      caseStudies(limit: 4) {
        title
        slug
        client
        listingSummary
        feedImage {
          ...fullImage
        }
        homepageImage {
          ...fullImage
        }
      }

      blogsSectionTitle
      blogPosts(limit: 5) {
        title
        slug
        listingSummary
        authors {
          name
          personPage {
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
