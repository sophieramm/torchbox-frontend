// Vendor Modules
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
// Components
import Avatar from '../avatar/avatar'
// Styles
import styles from './jobs-block.module.scss'

class JobsBlock extends React.Component {
  render() {
    const { jobs, className, listingUrl, greetingImage } = this.props

    return (
      <div className={[styles.block, className].join(' ')}>
        <img className={styles.blockImage} src={greetingImage} alt="" />

        <div className={styles.blockContent}>
          <div className={styles.blockJobList}>
            {jobs.map((job, index) => (
              <a
                key={`job-link-${index}`}
                className={styles.blockJobLink}
                href={job.href}
                target="_blank "
              >
                <h2 className={styles.blockJobLinkTitle}>{job.title}</h2>
                <p className={styles.blockJobLinkLevel}>{job.level}</p>
                <p className={styles.blockJobLinkLocation}>
                  {job.location}
                </p>
              </a>
            ))}
          </div>

          {listingUrl ? (
            <div className={styles.seeMore}>
              <Link to={listingUrl}>See more jobs</Link>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

JobsBlock.propTypes = {
  jobs: PropTypes.array,
  className: PropTypes.string,
  listingUrl: PropTypes.string,
  greetingImage: PropTypes.string,
}

JobsBlock.defaultProps = {
  className: '',
  jobs: [],
  sectionTitle: 'Thinking',
  greetingImage: require('@images/help-character.svg').default,
}

export default JobsBlock
