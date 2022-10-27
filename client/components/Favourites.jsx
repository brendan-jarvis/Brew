import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import md5 from 'md5'
import {
  Button,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material'

import { DeleteForever, Launch } from '@mui/icons-material'

import { getFavourites, updateFavourite, deleteFavourite } from '../actions'

function Favourites() {
  const favourites = useSelector((state) => state.favourites)
  const session = useSelector((state) => state.session)
  const { user } = session

  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.id) {
      dispatch(getFavourites(user.id))
    }
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteFavourite(id))
  }

  return (
    <Container>
      <Typography variant="h1">Favourites</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>BrewDog ID</TableCell>
              <TableCell>Added On</TableCell>
              <TableCell>Brewed</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favourites.map((beer) => (
              <TableRow
                key={md5(beer.id + beer.name)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    color="text.primary"
                    component={NavLink}
                    to={`/beer/${beer.brewdog_id}`}
                  >
                    {beer.name}
                    <Launch color="inherit" fontSize="inherit" />
                  </Typography>
                </TableCell>
                <TableCell>{beer.brewdog_id}</TableCell>
                <TableCell>
                  {new Date(beer.inserted_at).toLocaleDateString('en-NZ', {
                    timestyle: 'short',
                  })}
                </TableCell>
                <TableCell>
                  <Checkbox
                    type="checkbox"
                    checked={Boolean(beer.brewed)}
                    onChange={() =>
                      dispatch(
                        updateFavourite(beer.id, {
                          ...beer,
                          brewed: !beer.brewed,
                        })
                      )
                    }
                    aria-label={`Brewed ${beer.name}`}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(beer.id)}
                    endIcon={<DeleteForever />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Favourites
