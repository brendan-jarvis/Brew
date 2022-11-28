import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import {
  Alert,
  Button,
  LinearProgress,
  Container,
  Typography,
  Divider,
  TextField,
} from '@mui/material'

const AddRecipe = ({ session }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const inputRef = useRef(null)
  const nameRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', session.user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddRecipe = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setErrorMessage(null)

      const { data, error } = await supabase
        .from('recipes')
        .insert([
          {
            user_id: session.user.id,
            author_username: username,
            name: nameRef.current.value,
            inserted_at: new Date(),
            recipe: JSON.parse(inputRef.current.value),
          },
        ])
        .select()
        .single()

      if (error) {
        throw error
      }

      inputRef.current.value = ''

      // Redirect to the recipes page
      navigate(`/recipes/${data.id}`)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Add Recipe
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ my: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Divider />
      <TextField
        label="Recipe Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        inputRef={nameRef}
      />
      <TextField
        label="BeerJSON"
        multiline
        placeholder="Paste your BeerJSON here"
        fullWidth
        maxRows={6}
        sx={{ mb: 2 }}
        inputRef={inputRef}
      />
      <Button variant="contained" onClick={handleAddRecipe}>
        Upload Recipe
      </Button>
    </Container>
  )
}

export default AddRecipe
