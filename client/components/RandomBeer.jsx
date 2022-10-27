import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box, Container, Typography } from '@mui/material'
import DisplayBeer from './DisplayBeer'

import { fetchRandomBeer, getSettings } from '../actions'

function RandomBeer() {
  const session = useSelector((state) => state.session)
  const dispatch = useDispatch()

  const randomBeer = useSelector((state) => state.randomBeer)

  useEffect(() => {
    dispatch(getSettings(session?.user.id))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(fetchRandomBeer())
  }

  return (
    <Container>
      <Box textAlign="center">
        <Typography variant="h1">
          {randomBeer.id
            ? `#${randomBeer.id} ${randomBeer.name}`
            : `Random Beer`}
        </Typography>
        <Button variant="contained" onClick={handleSubmit}>
          Fetch Random Recipe
        </Button>
      </Box>
      {randomBeer.id ? <DisplayBeer beer={randomBeer} /> : null}
    </Container>
  )
}

export default RandomBeer
