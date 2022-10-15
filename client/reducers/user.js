import { SET_USER, LOGOUT_USER } from '../actions'

function user(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case SET_USER:
      return payload
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}

export default user
