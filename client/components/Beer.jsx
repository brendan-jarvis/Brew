import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, LinearProgress, Container } from '@mui/material'

import { fetchABeer } from '../actions'
import DisplayBeer from './DisplayBeer'

const Beer = ({ session }) => {
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchABeer(id))
  }, [])

  const beer = useSelector((state) => state.beer)

  return (
    <Container>
      {beer.id ? (
        <DisplayBeer beer={beer} session={session} />
      ) : (
        <Box textAlign="center">
          <LinearProgress color="secondary">
            <span className="visually-hidden">Loading...</span>
          </LinearProgress>
        </Box>
      )}
    </Container>
  )
}

export default Beer
