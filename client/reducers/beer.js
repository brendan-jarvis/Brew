import { RECEIVE_A_BEER } from '../actions'

function beer(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case RECEIVE_A_BEER:
      return payload[0]
    default:
      return state
  }
}

export default beer
