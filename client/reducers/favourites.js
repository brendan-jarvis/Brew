import {
  FETCH_FAVOURITES,
  ADD_FAVOURITE,
  UPDATE_FAVOURITES,
  DELETE_FAVOURITE,
} from '../actions'

function favourites(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_FAVOURITES:
      return payload
    case ADD_FAVOURITE:
      if (state.some((beer) => beer.brewdog_id === payload.brewdog_id)) {
        return state
      }
      return [...state, payload]
    case UPDATE_FAVOURITES:
      return payload
    case DELETE_FAVOURITE:
      return state.filter((favourite) => favourite.id !== payload.id)
    default:
      return state
  }
}

export default favourites
