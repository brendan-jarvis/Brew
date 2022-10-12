import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Favourites from './Favourites'
import SearchForm from './SearchForm'
import ErrorMessage from './ErrorMessage'
import RandomBeer from './RandomBeer'
import Beer from './Beer'

// Supabase components
import Auth from './Auth'
import Account from './Account'

function App() {
  const [user, setUser] = useState(null)
  const session = supabase.auth.session()

  useEffect(() => {
    setUser(session?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUser(currentUser ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [user])

  return (
    <>
      <div className="container">
        <ErrorMessage />
        <Nav />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/account"
            element={
              <Account
                key={session?.user.id ?? null}
                session={session ?? null}
              />
            }
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/search" element={<SearchForm />} />
          <Route path="/random" element={<RandomBeer />} />
          <Route path="/beer/">
            <Route path=":id" element={<Beer />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
