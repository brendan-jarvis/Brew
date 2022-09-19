import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Favourites from './Favourites'
import SearchForm from './SearchForm'
import ErrorMessage from './ErrorMessage'
import RandomBeer from './RandomBeer'
import Settings from './Settings'
import Beer from './Beer'

function App() {
  return (
    <>
      <div className="container">
        <ErrorMessage />
        <Nav />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/search" element={<SearchForm />} />
          <Route path="/random" element={<RandomBeer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/beer/">
            <Route path=":id" element={<Beer />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
