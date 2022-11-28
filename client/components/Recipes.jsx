import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'

const Recipes = ({ session }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getRecipes()
  }, [id])

  const getRecipes = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('recipes')
        .select('id, name, author_username, inserted_at, updated_at')

      if (error) {
        if (session.user) {
          setErrorMessage(error.message)
        } else {
          setErrorMessage('You must be logged in to view recipes')
        }
        throw error
      }

      if (data) {
        setRecipes(data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      {errorMessage ? (
        <>
          <Alert severity="error">{errorMessage}</Alert>
          <Typography variant="h2" textAlign="center">
            Sorry, we couldn&apos;t load the recipes!
          </Typography>
        </>
      ) : loading ? (
        <Box textAlign="center">
          <LinearProgress color="secondary" sx={{ mt: -1 }}>
            <span className="visually-hidden">Loading...</span>
          </LinearProgress>
        </Box>
      ) : (
        <>
          <Typography variant="h1" textAlign="center">
            Recipes
          </Typography>

          {session.user && (
            <Box textAlign="center" sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                component={NavLink}
                to="/recipes/add"
                sx={{ mt: 2 }}
              >
                Add a new recipe
              </Button>
            </Box>
          )}

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Uploaded By</TableCell>
                <TableCell>Added On</TableCell>
                <TableCell>Updated On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes?.map((recipe) => (
                <TableRow key={recipe?.name}>
                  <TableCell>
                    <NavLink to={`/recipes/${recipe?.id}`}>
                      {recipe?.name}
                    </NavLink>
                  </TableCell>
                  <TableCell style={{ textTransform: 'capitalize' }}>
                    <NavLink to={`/profiles/${recipe?.author_username}`}>
                      {recipe?.author_username}
                    </NavLink>
                  </TableCell>
                  <TableCell style={{ textTransform: 'capitalize' }}>
                    {new Date(recipe?.inserted_at).toDateString()}
                  </TableCell>
                  <TableCell style={{ textTransform: 'capitalize' }}>
                    {new Date(recipe?.updated_at).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Container>
  )
}

export default Recipes
