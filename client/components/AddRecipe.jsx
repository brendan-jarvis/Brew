import React, { useState, useRef } from 'react'
import { supabase } from '../utils/supabase'
import {
  Alert,
  Button,
  LinearProgress,
  Container,
  Typography,
  Divider,
  Paper,
  TextField,
} from '@mui/material'

const AddRecipe = ({ session }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const inputRef = useRef('')

  const handleAddRecipe = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setErrorMessage(null)

      const { data, error } = await supabase
        .from('recipes')
        .insert([
          {
            name: inputRef.current.value,
            user_id: session.user.id,
          },
        ])
        .single()

      if (error) {
        throw error
      }

      inputRef.current.value = ''
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
        label="BeerJSON"
        multiline
        placeholder="Paste your BeerJSON here"
        fullWidth
        maxRows={6}
        ref={inputRef}
      />
      <Button variant="contained" onClick={handleAddRecipe}>
        Upload Recipe
      </Button>
    </Container>
  )
}

export default AddRecipe
