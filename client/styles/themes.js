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
    },
  })
)

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
    },
  })
)
