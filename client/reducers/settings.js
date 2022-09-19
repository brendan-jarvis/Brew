import { FETCH_SETTINGS, UPDATE_SETTINGS, RECEIVE_SETTINGS } from '../actions'

function settings(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case RECEIVE_SETTINGS:
      return payload
    case UPDATE_SETTINGS:
      // TODO edit the state
      return state
    default:
      return state
  }
}

export default settings
