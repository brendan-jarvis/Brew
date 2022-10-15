import { SET_SESSION, CLEAR_SESSION } from '../actions'

function session(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case SET_SESSION:
      return payload
    case CLEAR_SESSION:
      return null
    default:
      return state
  }
}

export default session
