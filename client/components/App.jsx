import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { Routes, Route } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'
import { darkTheme, lightTheme } from '../styles/themes'

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

import { getSettings } from '../actions'
import { useSelector } from 'react-redux'

function App() {
  const [user, setUser] = useState(null)
  const session = supabase.auth.session()
  const settings = useSelector((state) => state.settings)

  useEffect(() => {
    setUser(session?.user ?? null)
    getSettings(user?.id)

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
    <ThemeProvider theme={settings.dark_mode ? darkTheme : lightTheme}>
      <div className="container">
        <Nav />
        <ErrorMessage />
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
    </ThemeProvider>
  )
}

export default App
