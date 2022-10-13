import {
  FETCH_FAVOURITES,
  ADD_FAVOURITE,
  UPDATE_FAVOURITE,
  REMOVE_FAVOURITE,
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
    case UPDATE_FAVOURITE:
      return state.map((favourite) => {
        if (payload.brewdog_id === favourite.brewdog_id) {
          return { ...favourite, ...payload }
        }
        return favourite
      })
    case REMOVE_FAVOURITE:
      return state.filter((favourite) => favourite.id !== payload)
    default:
      return state
  }
}

export default favourites
