import { combineReducers } from 'redux'

import randomBeer from './randomBeer'
import searchBeerRecipes from './searchBeerRecipes'
import errorMessage from './errorMessage'
import favourites from './favourites'
import settings from './settings'

export default combineReducers({
  randomBeer,
  searchBeerRecipes,
  favourites,
  errorMessage,
  settings,
})
