import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const baseTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontSecondary: 'Raleway, sans-serif',
  },
})

export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff',
      },
    },
  })
)

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#222222',
      },
      text: {
        primary: '#ffffff',
      },
    },
  })
)
