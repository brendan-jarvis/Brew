import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import {
  Alert,
  Box,
  LinearProgress,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'

const UserProfile = ({ session }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getRecipe()
  }, [id])

  const getRecipe = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('profiles')
        .select('id, avatar_url, username, website, recipes (user_id)')

      if (error) {
        if (session.user) {
          setErrorMessage(error.message)
        } else {
          setErrorMessage('You must be logged in to view recipes')
        }
        throw error
      }

      if (data) {
        setProfile(data)
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
            Sorry, we couldn&apos;t load the profile!
          </Typography>
        </>
      ) : loading ? (
        <Box textAlign="center">
          <LinearProgress color="secondary">
            <span className="visually-hidden">Loading...</span>
          </LinearProgress>
        </Box>
      ) : (
        <>
          <Typography variant="h1" textAlign="center">
            {profile?.username}
          </Typography>
          <Typography variant="body1" textAlign="center">
            Website: {profile?.website}
          </Typography>
          {profile?.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={`${profile?.username}'s avatar'`}
            />
          )}
          <Typography variant="h2" textAlign="center">
            User Recipes
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Added On</TableCell>
                <TableCell>Updated On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profile?.recipes?.map((recipe) => (
                <TableRow key={recipe?.name}>
                  <TableCell>
                    <NavLink to={`/recipes/${recipe?.id}`}>
                      {recipe?.name}
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

export default UserProfile
