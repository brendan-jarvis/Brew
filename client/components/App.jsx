import React, { useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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

import {
  storeSession,
  clearSession,
  getSettings,
  clearSettings,
} from '../actions'

function App() {
  const session = useSelector((state) => state.session)
  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        dispatch(storeSession(session))
      })
      .catch((error) => {
        console.log('error', error)
      })

    supabase.auth.onAuthStateChange(async (event, session) => {
      dispatch(storeSession(session))

      const currentUser = session?.user ?? null

      if (event == 'SIGNED_IN') {
        dispatch(getSettings(currentUser.id))
      }
      if (event == 'SIGNED_OUT') {
        dispatch(clearSession())
        dispatch(clearSettings())
      }
      if (event == 'USER_UPDATED') {
        dispatch(getSettings(currentUser.id))
      }
      if (event == 'PASSWORD_RECOVERY') {
        const newPassword = prompt(
          'What would you like your new password to be?'
        )
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        })

        if (data) alert('Password updated successfully!')
        if (error) alert('There was an error updating your password.')
      }
    })
  }, [])

  return (
    <ThemeProvider theme={settings.dark_mode ? darkTheme : lightTheme}>
      <div className="container">
        <Nav session={session} />
        <ErrorMessage />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account session={session} />} />
          <Route
            path="/favourites"
            element={<Favourites session={session} />}
          />
          <Route path="/search" element={<SearchForm session={session} />} />
          <Route path="/random" element={<RandomBeer session={session} />} />
          <Route path="/beer/">
            <Route path=":id" element={<Beer session={session} />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
