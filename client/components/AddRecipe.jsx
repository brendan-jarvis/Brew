import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Input,
  Container,
  Typography,
  Divider,
  TextField,
} from '@mui/material'

const AddRecipe = ({ session }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [beerJSON, setBeerJSON] = useState('')
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      setBeerJSON(text)
    }
    reader.readAsText(file)
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
            recipe: JSON.parse(beerJSON),
          },
        ])
        .select()
        .single()

      if (error) {
        throw error
      }

      setBeerJSON('')

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
      <Typography variant="h4" align="center" gutterBottom>
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
      <Typography variant="h6" gutterBottom>
        Paste your BeerJSON:
      </Typography>
      <TextField
        label="BeerJSON"
        placeholder="Paste your BeerJSON here"
        fullWidth
        multiline
        minRows={10}
        maxRows={20}
        sx={{ mb: 2 }}
        value={beerJSON}
        onChange={handleFileChange}
      />
      <Typography variant="h6" gutterBottom>
        Or upload from a .json file
      </Typography>
      <Input
        type="file"
        fullWidth
        sx={{ mb: 2 }}
        accept=".json"
        onChange={handleFileChange}
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={handleAddRecipe}>
          Add Recipe
        </Button>
      </Box>
    </Container>
  )
}

export default AddRecipe
