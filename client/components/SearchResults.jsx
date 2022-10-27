import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Table,
  Typography,
  Stack,
  TableCell,
  TableRow,
  TableHead,
} from '@mui/material'

import { SRMToRGBCSS } from '../utils/Utils'

import { insertFavourite } from '../actions'

import md5 from 'md5'

function RandomBeer() {
  const dispatch = useDispatch()
  const searchResults = useSelector((state) => state.searchBeerRecipes)
  const session = useSelector((state) => state.session)
  const { user } = session
  const [isFavourite, setIsFavourite] = useState({})

  const handleFavourite = async (id, name) => {
    try {
      const favourite = {
        user_id: user.id,
        brewdog_id: id,
        name: name,
        inserted_at: new Date(),
      }
      setIsFavourite(() => ({ ...isFavourite, [name]: true }))
      dispatch(insertFavourite(favourite))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Container>
      {searchResults?.map((beer) => {
        // Remove duplicates and sort alphabetically.
        const hops = beer.ingredients.hops.map((hop) => hop.name)
        const uniqueHops = [...new Set(hops)].sort()

        // No sort as base malt tends to come first.
        const malts = beer.ingredients.malt.map((malt) => malt.name)
        const uniqueMalts = [...new Set(malts)]

        return (
          <Box key={md5(beer.id + beer.name)}>
            <Stack>
              <Typography
                variant="h3"
                align="center"
                component={NavLink}
                to={`/beer/${beer.id}`}
              >
                #{beer.id} {beer.name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleFavourite(beer.id, beer.name)}
                disabled={!user || isFavourite[beer.name]}
              >
                {isFavourite[beer.name]
                  ? 'Added to Favourites'
                  : 'Add to Favourites'}
              </Button>
              <Typography variant="body1"></Typography>
              <Typography variant="body1" gutterBottom>
                {beer.description}
              </Typography>
              <Typography variant="body1" paragraph>
                <b>Malt:</b>{' '}
                {uniqueMalts
                  .map((malt) => {
                    return malt
                  })
                  .join(', ') + '.'}
              </Typography>
              <Typography variant="body1" paragraph>
                <b>Hops:</b>{' '}
                {uniqueHops
                  .map((hop) => {
                    return hop
                  })
                  .join(', ') + '.'}
              </Typography>
              <Typography variant="body1" paragraph>
                <b>Yeast:</b> {beer.ingredients.yeast}.
              </Typography>
              {beer.srm && (
                <Stack direction="row" spacing={1}>
                  <Box>
                    <Typography variant="body1">
                      <b>Colour: </b>
                    </Typography>
                  </Box>
                  <Box>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: '45px' }}
                    >
                      <rect
                        x="20"
                        y="0"
                        width="106.960718663"
                        height="24.25"
                        stroke="black"
                        fill={SRMToRGBCSS(beer.srm)}
                      />
                    </svg>
                  </Box>
                </Stack>
              )}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <abbr title="European Brewery Convention">EBC</abbr>
                    </TableCell>
                    <TableCell>
                      <abbr title="Standard Reference Method">SRM</abbr>
                    </TableCell>
                    <TableCell>
                      <abbr title="Alcohol By Volume">ABV</abbr>
                    </TableCell>
                    <TableCell>
                      <abbr title="International Bitterness Units">IBU</abbr>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow>
                    <TableCell>{beer.ebc}</TableCell>
                    <TableCell>{beer.srm}</TableCell>
                    <TableCell>{beer.abv}%</TableCell>
                    <TableCell>{beer.ibu}</TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </Stack>
          </Box>
        )
      })}
    </Container>
  )
}

export default RandomBeer
