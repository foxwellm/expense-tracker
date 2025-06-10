'use client'

import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    breakpoints: {
      values: {
        zero: 0,
        xs: 600, // Mobile
        sm: 750, // Small Tablet
        md: 900, // Tablet
        lg: 1280,
        xl: 1536, // Desktop
        xxl: 1728,
        xxxl: 2100,
      },
    },
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#0d0d0d' : '#fafafa',
        paper: mode === 'dark' ? '#1a1a1a' : '#ffffff',
        demo: mode === 'dark' ? '#030712' : '#fafafa',
      },
      primary: {
        main: '#4dabf7',
      },
      secondary: {
        main: '#f783ac',
      },
      info: {
        main: '#F07400',
      },
      text: {
        primary: mode === 'dark' ? '#ededed' : '#111111',
        secondary: mode === 'dark' ? '#b0b0b0' : '#555555',
      },
      divider: mode === 'dark' ? '#2e2e2e' : '#e0e0e0',
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      largeHeader: {
        fontSize: 'clamp(0.875rem, 3vw, 1.75rem)',
        fontWeight: 600,
      },
      mediumHeader: {
        fontSize: 'clamp(1rem, 3vw, 1.25rem)',
        fontWeight: 600,
      },
      h1: {
        fontSize: '1.75rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 700,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '0.75rem',
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.75rem',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            overscrollBehaviorY: 'none',
            WebkitFontSmoothing: 'antialiased', // sharper font on MacOS
            MozOsxFontSmoothing: 'grayscale', // sharper font on Firefox
            margin: 0,
            padding: 0,
            minHeight: '100vh',
            width: '100%',
          },
          '*': {
            boxSizing: 'border-box',
            transition: 'background-color 1.5s ease, color 0.3s ease',
          },
          html: {
            overscrollBehaviorY: 'none',
            height: '100%',
            width: '100%',
          },
          '#__next': {
            overscrollBehaviorY: 'none',
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            cursor: 'default',
          },
        },
      },
    },
  })
