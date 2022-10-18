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
      type: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: 'rgb(220, 0, 78)',
      },
      background: {
        default: '#fff',
        paper: '#fff',
      },
    },
  })
)

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#212121',
        paper: '#424242',
      },
    },
  })
)
