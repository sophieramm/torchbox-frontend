// Color vars are in ./src/styles/_vars.scss
export const lightTheme = {
  // Base Colors
  'color-primary': 'var(--color-blue)',
  'color-accent': 'var(--color-coral)',

  // Hero Component
  'hero-background': 'white',
  'hero-title-color': 'var(--color-primary)',
  'hero-link-color': 'var(--color-light-blue)',

  // Header Component
  'header-background': 'white',
  'header-link-color': 'var(--color-primary)',
  'header-logo-color': 'var(--color-primary)',
  'header-icon-color': 'var(--color-accent)',
  'header-nested-link-color': 'var(--color-light-blue)',

  // Links
  'color-link': 'var(--color-light-blue)',
  'color-link-hover': 'var(--color-light-blue)',
  'color-link-badge': 'white',
}

export const darkTheme = {
  // Base colors:
  'color-primary': 'var(--color-blue)',
  'color-accent': 'var(--color-green)',

  // Hero Component
  'hero-background': 'var(--color-primary)',
  'hero-title-color': 'white',
  'hero-link-color': 'white',

  // Header Component
  'header-background': 'var(--color-primary)',
  'header-link-color': 'white',
  'header-logo-color': 'white',
  'header-icon-color': 'white',
  'header-nested-link-color': 'white',

  // Links
  'color-link': 'var(--color-primary)',
  'color-link-hover': 'white',
  'color-link-badge': 'var(--color-primary)',
}

export const darkThemeTransparent = {
  ...darkTheme,
  'header-background': 'transparent',
}

export const getTheme = theme =>
  ({
    light: lightTheme,
    dark: darkTheme,
    'dark--transparent': darkThemeTransparent,
  }[theme || 'light'])

export default getTheme
