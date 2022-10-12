import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import { Alert, Button, Box, Container, TextField, Stack } from '@mui/material'

const Auth = () => {
  const [helperText, setHelperText] = useState({ error: null, text: null })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const session = supabase.auth.session()
  const navigate = useNavigate()

  useEffect(() => {
    if (session) {
      setHelperText({ error: false, text: 'You are logged in!' })
      navigate('/')
    }
  }, [session])

  const handleLogin = async (type) => {
    const { user, error } =
      type === 'LOGIN'
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password })

    if (error) {
      setHelperText({ error: true, text: error.message })
    } else if (!user && !error) {
      setHelperText({
        error: false,
        text: 'An email has been sent to you for verification!',
      })
    }
  }

  const forgotPassword = async (e) => {
    // Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
    e.preventDefault()

    if (email === null || email === '') {
      setHelperText({ error: true, text: 'You must enter your email.' })
    } else {
      let { error } = await supabase.auth.api.resetPasswordForEmail(email)
      if (error) {
        console.error('Error: ', error.message)
      } else {
        setHelperText({
          error: false,
          text: 'Password recovery email has been sent.',
        })
      }
    }
  }

  return (
    <Container>
      <h2>Authenticate</h2>
      <Stack>
        <TextField
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />

        <TextField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />

        <Button variant="text" onClick={forgotPassword}>
          Forgot Password?
        </Button>
        {!!helperText.text && (
          <Alert severity={`${helperText.error ? 'error' : 'info'}`}>
            {helperText.text}
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={() => handleLogin('REGISTER').catch(console.error)}
        >
          Register
        </Button>

        <Button
          variant="outlined"
          onClick={() => handleLogin('LOGIN').catch(console.error)}
        >
          Login
        </Button>
      </Stack>
    </Container>
  )
}

export default Auth
