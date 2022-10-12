import { FETCH_SETTINGS, UPDATE_SETTINGS } from '../actions'

function settings(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_SETTINGS:
      return payload
    case UPDATE_SETTINGS:
      return payload
    default:
      return state
  }
}

export default settings
