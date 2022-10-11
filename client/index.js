import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

// Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Bundle JS
// import 'bootstrap/dist/js/bootstrap.bundle.min'

import 'bootstrap'

import store from './store'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('app')
  )
})
