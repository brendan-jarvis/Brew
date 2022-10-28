import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Box,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material'
import DisplayBeer from './DisplayBeer'

import { fetchRandomBeer } from '../actions'

const RandomBeer = ({ session }) => {
  const dispatch = useDispatch()

  const randomBeer = useSelector((state) => state.randomBeer)

  useEffect(() => {
    dispatch(fetchRandomBeer())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(fetchRandomBeer())
  }

  return (
    <Container>
      {randomBeer.id ? (
        <Box textAlign="center">
          <Typography variant="h1">
            #{randomBeer.id} {randomBeer.name}
          </Typography>
          <Button variant="contained" onClick={handleSubmit}>
            Fetch Another Recipe
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          <LinearProgress color="secondary">
            <span className="visually-hidden">Loading...</span>
          </LinearProgress>
        </Box>
      )}
      {randomBeer.id ? (
        <DisplayBeer beer={randomBeer} session={session} />
      ) : null}
    </Container>
  )
}

export default RandomBeer
