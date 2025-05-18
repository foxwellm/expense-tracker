'use client'

import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#0d0d0d' : '#fafafa',
        paper: mode === 'dark' ? '#1a1a1a' : '#ffffff',
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
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            overscrollBehaviorY: 'none',
            backgroundColor: mode === 'dark' ? '#0d0d0d' : '#fafafa',
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
    },
  })
