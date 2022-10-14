import request from 'superagent'
import { supabase } from '../components/supabase'

export const REQUEST_BEER = 'REQUEST_BEER'
export const RECEIVE_BEER = 'RECEIVE_BEER'
export const RECEIVE_A_BEER = 'RECEIVE_A_BEER'

export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'

export const SHOW_ERROR = 'SHOW_ERROR'

export const FETCH_SETTINGS = 'FETCH_SETTINGS'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS'

export const FETCH_FAVOURITES = 'FETCH_FAVOURITES'
export const ADD_FAVOURITE = 'ADD_FAVOURITE'
export const UPDATE_FAVOURITE = 'UPDATE_FAVOURITES'
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'

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

export function receiveABeer(beer) {
  return {
    type: RECEIVE_A_BEER,
    payload: beer,
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

export function fetchSettings(settings) {
  return {
    type: FETCH_SETTINGS,
    payload: settings,
  }
}

export function fetchFavourites(favourites) {
  return {
    type: FETCH_FAVOURITES,
    payload: favourites,
  }
}

export function addFavourite(favourite) {
  return {
    type: ADD_FAVOURITE,
    payload: favourite,
  }
}

export function editFavourite(updates) {
  return {
    type: UPDATE_FAVOURITE,
    payload: updates,
  }
}

export function removeFavourite(favourite) {
  return {
    type: REMOVE_FAVOURITE,
    payload: favourite,
  }
}

export function updateSettings(settings) {
  return {
    type: UPDATE_SETTINGS,
    payload: settings,
  }
}

export function fetchABeer(id) {
  return async (dispatch) => {
    dispatch(requestBeer())
    try {
      const res = await request.get(`https://api.punkapi.com/v2/beers/${id}`)
      dispatch(receiveABeer(res.body))
    } catch (err) {
      dispatch(showError(err.message))
    }
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

export function getSettings(id) {
  return async (dispatch) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(
          'imperial_temperature, imperial_units, ounces, calories, dark_mode'
        )
        .eq('id', id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      return dispatch(fetchSettings(data))
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function editSettings(id, settings) {
  return async (dispatch) => {
    try {
      const updates = {
        id: id,
        ...settings,
      }

      dispatch(updateSettings(updates))

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function getFavourites(id) {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from('favourites')
        .select('*')
        .eq('user_id', id)

      dispatch(fetchFavourites(data))

      if (error) {
        throw error
      }
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function insertFavourite(favourite) {
  return async (dispatch) => {
    try {
      dispatch(addFavourite(favourite))

      const { error } = await supabase.from('favourites').upsert(favourite)

      if (error) {
        throw error
      }
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function updateFavourite(id, favourite) {
  return async (dispatch) => {
    try {
      const updates = {
        id: id,
        updated_at: new Date().toISOString(),
        ...favourite,
      }

      dispatch(editFavourite(updates))

      let { error } = await supabase.from('favourites').upsert(updates)

      if (error) {
        throw error
      }
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}

export function deleteFavourite(id) {
  return async (dispatch) => {
    try {
      dispatch(removeFavourite(id))

      let { error } = await supabase.from('favourites').delete().eq('id', id)

      if (error) {
        throw error
      }
    } catch (err) {
      dispatch(showError(err.message))
    }
  }
}
