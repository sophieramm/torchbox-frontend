import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'

import MenuButton from '../menu-button'
import NavLink from '../nav-link'
import { ReactComponent as Logo } from '../../images/logo.svg'
import { ReactComponent as Flame } from '../../images/tbx-flame.svg'
import styles from './header.module.scss'
import ThemeContext from '../../context/theme-context'

class Header extends React.Component {
  state = { mobileNavOpen: false, collapsed: false }

  componentDidMount() {
    if (this.props.shouldCollapse && typeof window !== `undefined`) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
          if (!this.state.collapsed) {
            this.setState({ collapsed: true })
          }
        } else {
          if (this.state.collapsed) {
            this.setState({ collapsed: false })
          }
        }
      })
    }
  }

  render() {
    const { title, links, navigateTo, logoClick, nestedLinks } = this.props

    return (
      <ThemeContext.Consumer>
        {theme => (
          <div
            className={[
              this.state.collapsed ? styles.collapsedHeader : styles.header,
              theme,
            ].join(' ')}
          >
            <div className={styles.headerInner}>
              {this.state.collapsed ? (
                <div className={styles.collapsedLogoContainer}>
                  <Flame className={styles.logoFlame} onClick={logoClick} />
                  <span className={styles.logoText}>{title}</span>
                </div>
              ) : (
                <div className={styles.logoContainer}>
                  <Logo className={styles.logo} onClick={logoClick} />
                </div>
              )}

              <div className={styles.primaryNavContainer}>
                <ul className={styles.primaryNavList}>
                  {links.map((link, index) => (
                    <li key={`primary-nav-link-${index}`}>
                      <NavLink
                        {...link}
                        collapsed={this.state.collapsed}
                        onClick={() => navigateTo(link.href)}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {nestedLinks != null ? (
                <div className={styles.nestedNavContainer}>
                  <ul className={styles.nestedNavList}>
                    {nestedLinks.map((link, index) => (
                      <li
                        key={`nested-nav-link-${index}`}
                        className={
                          link.active
                            ? styles.nestedNavItemActive
                            : styles.nestedNavItem
                        }
                      >
                        <Link
                          className={styles.nestedNavLink}
                          onClick={link.onClick}
                          to={link.href}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <MenuButton
                className={styles.headerMenuButton}
                isOpen={this.state.mobileNavOpen}
                onClick={() =>
                  this.setState({ mobileNavOpen: !this.state.mobileNavOpen })
                }
              />
            </div>

            <div className={styles.mobileNavContainer}>
              <div
                className={
                  this.state.mobileNavOpen
                    ? styles.mobileNavModalOpen
                    : styles.mobileNavModal
                }
              >
                <ul className={styles.mobileNavList}>
                  {links.map((link, index) => (
                    <li
                      key={`mobile-nav-link-${index}`}
                      className={link.alignRight ? styles.alignRight : ''}
                    >
                      <NavLink
                        {...link}
                        collapsed={this.state.collapsed}
                        onClick={() => navigateTo(link.href)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  navigateTo: PropTypes.func,
  logoClick: PropTypes.func,
  links: PropTypes.array,
  nestedLinks: PropTypes.array,
  shouldCollapse: PropTypes.bool,
}

Header.defaultProps = {
  links: [],
  nestedLinks: [],
  shouldCollapse: false,
}

export default Header
