import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box, Container, LinearProgress } from '@mui/material'
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
        <Box textAlign="center" sx={{ m: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Fetch Another Recipe
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          <LinearProgress color="secondary" sx={{ mt: -1 }}>
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
