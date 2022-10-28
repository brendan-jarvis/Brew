import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const baseTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontSecondary: 'Raleway, sans-serif',
  },
})

const darkMain = '#073b4c'
const darkLight = '#3b6578'
const darkDark = '#001624'
const darkContrastText = '#fff'

const blueMain = '#118ab2'
const blueLight = '#5abae4'
const blueDark = '#005d82'
const blueContrastText = '#fff'

const greenMain = '#06d6a0'
const greenLight = '#63ffd1'
const greenDark = '#00a371'
const greenContrastText = '#000'

const lightOrangeMain = '#ffd166'
const lightOrangeLight = '#ffff97'
const lightOrangeDark = '#c9a036'
const lightOrangeContrastText = '#000'

const pinkMain = '#ef476f'
const pinkLight = '#ff7c9d'
const pinkDark = '#b70044'
const pinkContrastText = '#fff'

const white = '#ffffff'

export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: 'light',
      background: {
        default: white,
      },
      primary: {
        light: greenLight,
        main: greenMain,
        dark: greenDark,
        contrastText: greenContrastText,
      },
      secondary: {
        light: blueLight,
        main: blueMain,
        dark: blueDark,
        contrastText: blueContrastText,
      },
    },
  })
)

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: darkMain,
      },
      text: {
        primary: white,
      },
      primary: {
        light: greenLight,
        main: greenMain,
        dark: greenDark,
        contrastText: greenContrastText,
      },
      secondary: {
        light: blueLight,
        main: blueMain,
        dark: blueDark,
        contrastText: blueContrastText,
      },
    },
  })
)
