import request from 'superagent'
import {
  getFavouritesApi,
  delFavouriteApi,
  addFavouriteApi,
  editFavouriteApi,
} from '../apis/favouritesApi'

import { getSettingsApi, editSettingsApi } from '../apis/settingsApi'

export const REQUEST_BEER = 'REQUEST_BEER'
export const RECEIVE_BEER = 'RECEIVE_BEER'

export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'

export const SHOW_ERROR = 'SHOW_ERROR'

export const FETCH_FAVOURITES = 'FETCH_FAVOURITES'
export const SHOW_FAVOURITES = 'SHOW_FAVOURITES'

export const SAVE_FAVOURITE = 'SAVE_FAVOURITE'
export const DEL_FAVOURITE = 'DEL_FAVOURITE'
export const EDIT_FAVOURITES = 'EDIT_FAVOURITES'

export const FETCH_SETTINGS = 'FETCH_SETTINGS'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS'

export function requestBeer() {
  return {
    type: REQUEST_BEER,
  }
}

export function requestSearch() {
  return {
    type: REQUEST_SEARCH,
  }
}

export function receiveBeer(beer) {
  return {
    type: RECEIVE_BEER,
    payload: beer,
  }
}

export function receiveSearch(results) {
  return {
    type: RECEIVE_SEARCH,
    payload: results,
  }
}

export function showError(errorMessage) {
  return {
    type: SHOW_ERROR,
    payload: errorMessage,
  }
}

export function fetchFavourites() {
  return {
    type: FETCH_FAVOURITES,
  }
}

export function fetchSettings() {
  return {
    type: FETCH_SETTINGS,
  }
}

export function receiveSettings(results) {
  return {
    type: RECEIVE_SETTINGS,
    payload: results,
  }
}

export function updateSettings() {
  return {
    type: UPDATE_SETTINGS,
  }
}

export function showFavourites(favourites) {
  return {
    type: SHOW_FAVOURITES,
    payload: favourites,
  }
}

export function saveFavourite(favourite) {
  return {
    type: SAVE_FAVOURITE,
    payload: favourite,
  }
}

export function delFavourites(beer) {
  return {
    type: DEL_FAVOURITE,
    payload: beer,
  }
}

export function editFavourites() {
  return {
    type: EDIT_FAVOURITES,
  }
}

export function fetchRandomBeer() {
  return async (dispatch) => {
    dispatch(requestBeer())
    try {
      const res = await request.get(`https://api.punkapi.com/v2/beers/random`)
      dispatch(receiveBeer(res.body))
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function searchBeerRecipes(query) {
  let queryString = []
  // Skip queries where the maximum range is selected
  if (query.abv[0] !== 0) {
    queryString.push(`abv_gt=${query.abv[0]}`)
  }
  if (query.abv[1] !== 30) {
    queryString.push(`abv_gt=${query.abv[1]}`)
  }
  if (query.ibu[0] !== 0) {
    queryString.push(`ibu_gt=${query.ibu[0]}`)
  }
  if (query.ibu[1] !== 150) {
    queryString.push(`ibu_gt=${query.ibu[1]}`)
  }
  if (query.ebc[0] !== 0) {
    queryString.push(`ebc_gt=${query.ebc[0]}`)
  }
  if (query.ebc[1] !== 50) {
    queryString.push(`ebc_gt=${query.ebc[1]}`)
  }
  if (query.hops) {
    queryString.push(`hops=${query.hops}`)
  }
  if (query.malt) {
    queryString.push(`&malt=${query.malt}`)
  }
  if (query.yeast) {
    queryString.push(`&yeast=${query.yeast}`)
  }
  if (query.search) {
    queryString.push(`&beer_name=${query.search}`)
  }

  console.log(`https://api.punkapi.com/v2/beers?${queryString.join('&')}`)

  return async (dispatch) => {
    dispatch(requestSearch())
    try {
      const res = await request.get(
        `https://api.punkapi.com/v2/beers?${queryString.join('&')}`
      )
      dispatch(receiveSearch(res.body))
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function getFavourites() {
  return async (dispatch) => {
    dispatch(fetchFavourites())
    try {
      const res = await getFavouritesApi()
      return dispatch(showFavourites(res))
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function addFavourite(beer) {
  return async (dispatch) => {
    try {
      const res = await addFavouriteApi(beer)
      return dispatch(getFavourites())
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function deleteBeerFromFavourites(id) {
  return async (dispatch) => {
    dispatch(delFavourites(id))
    try {
      const res = await delFavouriteApi(id)
      return dispatch(getFavourites())
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function editFavourite(id, beer) {
  return async (dispatch) => {
    dispatch(editFavourites())
    try {
      const res = await editFavouriteApi(id, beer)
      return dispatch(getFavourites())
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function getSettings() {
  return async (dispatch) => {
    dispatch(fetchSettings())
    try {
      const res = await getSettingsApi()
      return dispatch(receiveSettings(res))
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function editSettings(settings) {
  return async (dispatch) => {
    dispatch(updateSettings())
    try {
      const res = await editSettingsApi(settings)
      return dispatch(getSettings())
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}
