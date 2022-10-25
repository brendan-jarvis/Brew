import React, { useState, useRef } from 'react'
import { supabase } from '../utils/supabase'
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  TextField,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [helperText, setHelperText] = useState({ error: null, text: null })
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e, type) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    setLoading(true)

    const { data, error } =
      type === 'LOGIN'
        ? await supabase.auth.signInWithPassword({
            email,
            password,
          })
        : await supabase.auth.signUp({
            email,
            password,
          })

    setLoading(false)

    if (error) {
      setHelperText({ error: true, text: error.message })
    } else if (!data && !error) {
      setHelperText({
        error: false,
        text: 'An email has been sent to you for verification!',
      })
    } else {
      navigate('/')
    }
  }

  const forgotPassword = async (e) => {
    // Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
    e.preventDefault()

    setLoading(true)

    const email = emailRef.current.value

    if (email === null || email === '') {
      setHelperText({ error: true, text: 'You must enter your email.' })
      setLoading(false)
    } else {
      let { error } = await supabase.auth.api.resetPasswordForEmail(email)

      setHelperText({
        error: false,
        text: 'Password recovery email has been sent.',
      })

      setLoading(false)

      if (error) {
        console.error('Error: ', error.message)
      }
    }
  }

  return (
    <Container component="form">
      <Typography variant="h3" align="center">
        Authenticate with Brew!
      </Typography>
      <Stack spacing={2} alignItems="center">
        <TextField
          type="email"
          name="email"
          label="Email"
          inputRef={emailRef}
          fullWidth
          required
        />

        <TextField
          type="password"
          name="password"
          label="Password"
          inputRef={passwordRef}
          fullWidth
          required
        />
        {!!helperText.text && (
          <Alert severity={`${helperText.error ? 'error' : 'info'}`}>
            {helperText.text}
          </Alert>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button variant="text" color="info" onClick={forgotPassword}>
              Forgot Password?
            </Button>

            <Button
              variant="contained"
              color="primary"
              aria-label="register"
              onClick={(e) => handleLogin(e, 'REGISTER').catch(console.error)}
              fullWidth
            >
              Register
            </Button>

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              aria-label="login"
              onClick={(e) => handleLogin(e, 'LOGIN').catch(console.error)}
              fullWidth
            >
              Login
            </Button>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default Auth
