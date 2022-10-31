import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import {
  Box,
  LinearProgress,
  Container,
  Stack,
  Typography,
  TextField,
  Divider,
} from '@mui/material'

const ViewRecipe = ({ session }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    getRecipe()
  }, [id])

  const getRecipe = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('recipes')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setRecipe(data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const beerjson = recipe?.recipe.beerjson.recipes[0] ?? null

  return (
    <Container>
      {loading ? (
        <Box textAlign="center">
          <LinearProgress color="secondary">
            <span className="visually-hidden">Loading...</span>
          </LinearProgress>
        </Box>
      ) : (
        <Box textAlign="center">
          <Typography variant="h1" align="center">
            {recipe?.name}
          </Typography>
          <Typography variant="h2" align="center">
            Author: {recipe?.author_username}
          </Typography>
          <Typography variant="h3" align="center">
            Created:{' '}
            {new Date(recipe?.inserted_at).toLocaleDateString('en-NZ', {
              timestyle: 'short',
            })}
          </Typography>
          {recipe?.updated_at != recipe?.inserted_at && (
            <Typography variant="h3" align="center">
              Updated: {recipe?.updated_at}
            </Typography>
          )}
          <Divider />
          {recipe && (
            <Stack spacing={2}>
              {Object.keys(beerjson).map((key) => (
                <>
                  <Typography
                    key={key + 'title'}
                    variant="body1"
                    align="center"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Typography>
                  <TextField
                    key={key}
                    type="text"
                    name={key}
                    label={key}
                    value={JSON.stringify(beerjson[key])}
                    fullWidth
                    multiline
                  />
                </>
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Container>
  )
}

export default ViewRecipe
