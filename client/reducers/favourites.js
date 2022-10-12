import {
  FETCH_FAVOURITES,
  UPDATE_FAVOURITES,
  DELETE_FAVOURITE,
} from '../actions'

function favourites(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_FAVOURITES:
      return payload
    case UPDATE_FAVOURITES:
      return payload
    case DELETE_FAVOURITE:
      return state.filter((favourite) => favourite.id !== payload.id)
    default:
      return state
  }
}

export default favourites
