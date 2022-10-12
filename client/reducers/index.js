import { combineReducers } from 'redux'

import randomBeer from './randomBeer'
import searchBeerRecipes from './searchBeerRecipes'
import errorMessage from './errorMessage'
import beer from './beer'
import settings from './settings'
import favourites from './favourites'

export default combineReducers({
  randomBeer,
  searchBeerRecipes,
  errorMessage,
  beer,
  settings,
  favourites,
})
