import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Stack, Table } from 'react-bootstrap'

import { SRMToRGBCSS } from './Utils'

import { addFavourite } from '../actions'

import Hash from 'hash-string'

function RandomBeer() {
  const dispatch = useDispatch()
  const searchResults = useSelector((state) => state.searchBeerRecipes)

  const handleFavourite = (e) => {
    const beer = { brewdog_id: e.target.id, name: e.target.name }

    e.target.className = 'btn btn-success disabled'

    e.target.innerText = 'Saved to favourites!'

    dispatch(addFavourite(beer))
  }

  return (
    <div className="container">
      {searchResults?.map((beer) => {
        // Remove duplicates and sort alphabetically.
        const hops = beer.ingredients.hops.map((hop) => hop.name)
        const uniqueHops = [...new Set(hops)].sort()

        // No sort as base malt tends to come first.
        const malts = beer.ingredients.malt.map((malt) => malt.name)
        const uniqueMalts = [...new Set(malts)]

        return (
          <div key={Hash(beer.id + beer.name)}>
            <Stack>
              <h3 className="text-center">
                <a href={`/beer/${beer.id}`} className="link-dark">
                  #{beer.id} {beer.name}
                </a>
              </h3>
              <Button
                variant="secondary"
                id={beer.id}
                name={beer.name}
                onClick={(e) => handleFavourite(e)}
              >
                Add to Favourites
              </Button>
              <p>{beer.description}</p>
              <p>
                <b>Malt:</b>{' '}
                {uniqueMalts
                  .map((malt) => {
                    return malt
                  })
                  .join(', ') + '.'}
              </p>
              <p>
                <b>Hops:</b>{' '}
                {uniqueHops
                  .map((hop) => {
                    return hop
                  })
                  .join(', ') + '.'}
              </p>
              <p>
                <b>Yeast:</b> {beer.ingredients.yeast}.
              </p>
              {beer.srm && (
                <Stack direction="horizontal" gap={1}>
                  <div>
                    <p>
                      <b>Colour: </b>
                    </p>
                  </div>
                  <div>
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
                  </div>
                </Stack>
              )}
              <Table>
                <thead>
                  <tr>
                    <th>
                      <abbr title="European Brewery Convention">EBC</abbr>
                    </th>
                    <th>
                      <abbr title="Standard Reference Method">SRM</abbr>
                    </th>
                    <th>
                      <abbr title="Alcohol By Volume">ABV</abbr>
                    </th>
                    <th>
                      <abbr title="International Bitterness Units">IBU</abbr>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{beer.ebc}</td>
                    <td>{beer.srm}</td>
                    <td>{beer.abv}%</td>
                    <td>{beer.ibu}</td>
                  </tr>
                </tbody>
              </Table>
            </Stack>
          </div>
        )
      })}
    </div>
  )
}

export default RandomBeer
