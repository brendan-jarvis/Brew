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
        console.log(data)
        setRecipe(data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

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
            Created: {recipe?.inserted_at}
          </Typography>
          {recipe?.updated_at != recipe?.inserted_at && (
            <Typography variant="h3" align="center">
              Updated: {recipe?.updated_at}
            </Typography>
          )}
          <Stack spacing={2}>
            <Typography variant="body1" align="center">
              {recipe &&
                Object.keys(recipe?.recipe.beerjson.recipes[0]).map((key) => (
                  <>
                    <Typography variant="body1" align="center">
                      {key}
                    </Typography>
                    <TextField
                      key={key}
                      type="text"
                      label={key}
                      value={recipe.recipe.beerjson.recipes[0][key]}
                      fullWidth
                      multiline
                    />
                  </>
                ))}
            </Typography>
          </Stack>
        </Box>
      )}
    </Container>
  )
}

export default ViewRecipe
