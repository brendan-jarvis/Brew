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
  Paper,
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
  // const { fermentable_additions, hop_additions, culture_additions } =
  //   recipe.ingredients ?? {}

  console.log(beerjson)

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
            Uploaded by: {recipe?.author_username}
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
            <>
              <Paper>
                <Stack spacing={2}>
                  <Typography style={{ textTransform: 'capitalize' }}>
                    <strong>Style:</strong> {beerjson?.style?.name}
                  </Typography>
                  {beerjson.ingredients.fermentable_additions.map(
                    (ferm, idx) => (
                      <Typography
                        key={ferm + idx}
                        variant="body1"
                        style={{ textTransform: 'capitalize' }}
                      >
                        <strong>{ferm.type}:</strong> {ferm.name}
                      </Typography>
                    )
                  )}
                </Stack>
              </Paper>
              <Paper>
                <Stack spacing={2}>
                  {Object.keys(beerjson).map((key, idx) => (
                    <>
                      <Typography
                        key={key + idx}
                        variant="body1"
                        align="center"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {key}:
                      </Typography>
                      <TextField
                        key={key + idx}
                        type="text"
                        name={key}
                        label={key}
                        value={JSON.stringify(beerjson[key], null, 2)}
                        fullWidth
                        multiline
                      />
                    </>
                  ))}
                </Stack>
              </Paper>
            </>
          )}
        </Box>
      )}
    </Container>
  )
}

export default ViewRecipe
