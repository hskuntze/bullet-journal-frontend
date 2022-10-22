import theme from 'styled-theming';

export const backgroundColor: theme.ThemeSet = theme('mode', {
  light: '#f5f5f5',
  dark: '#101211'
});

export const backgroundHoverColor: theme.ThemeSet = theme('mode', {
  light: '#121212',
  dark: '#f5f5f5'
});

export const textColor: theme.ThemeSet = theme('mode', {
  light: '#021214',
  dark: '#f5f5f5'
});

export const navbarBackgroundColor = theme('mode', {
  light: '#DBDBDB',
  dark: '#121010'
});

export const navbarBoxshadowColor = theme('mode', {
  light: '0px 5px 10px #b5b5b5',
  dark: '0px 5px 10px #262626'
});

export const cardColor = theme('mode', {
  light: '#b5b5b5',
  dark: '#2D3330'
});

export const buttonBackgroundColor = theme('mode', {
  light: '#999',
  dark: '#545E59'
});

export const buttonBackgroundColorHover = theme('mode', {
  light: '#bbb',
  dark: '#444'
});

export const homeAnimationBackground = theme('mode', {
  light: 'linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(212,215,210,1) 50%, rgba(199,197,188,1) 100%)',
  dark: 'linear-gradient(90deg, rgba(16,18,17,1) 0%, rgba(38,44,38,1) 50%, rgba(56,56,63,1) 100%)'
});