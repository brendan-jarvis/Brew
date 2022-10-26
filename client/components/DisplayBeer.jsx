import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { supabase } from '../utils/supabase'

import { insertFavourite } from '../actions'

import {
  SRMToRGBCSS,
  calcCalories,
  convertCToF,
  convertLitresToGallons,
  convertKilogramsToPounds,
  convertGToOz,
} from '../utils/Utils'

import md5 from 'md5'

async function DisplayBeer({ beer }) {
  const settings = useSelector((state) => state.settings)
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { user } = session
  const dispatch = useDispatch()

  const [isFavourite, setIsFavourite] = useState(false)

  const calories = calcCalories(beer.target_og / 1000, beer.target_fg / 1000)
  const kilojoules = calories * 4.18

  useEffect(() => {
    setIsFavourite(false)
  }, [beer])

  const handleFavourite = async () => {
    try {
      const favourite = {
        user_id: user.id,
        brewdog_id: beer.id,
        name: beer.name,
        inserted_at: new Date(),
      }

      setIsFavourite(true)

      dispatch(insertFavourite(favourite))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Box key={md5(beer)}>
      <div>
        <Typography variant="h3" align="center">
          {beer.tagline}
        </Typography>
        <Typography variant="body1" align="center">
          {beer.description}
        </Typography>
        <Box textAlign="center">
          <Button
            variant="contained"
            color={isFavourite ? 'secondary' : 'success'}
            disabled={isFavourite}
            onClick={handleFavourite}
          >
            {isFavourite ? 'Saved to favourites!' : 'Save to favourites!'}
          </Button>
        </Box>
        <Typography variant="h5" align="center">
          Food pairing
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="food pairing">
          <TableBody>
            <TableRow>
              {beer.food_pairing.map((food) => (
                <TableCell key={md5(food)} align="center">
                  {food}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* TODO: Fix formatting and layout of these tables */}
      <div>
        <Typography variant="h5" align="center">
          Beer characteristics
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="beer characteristics">
          <TableHead>
            <TableRow>
              <TableCell>
                <abbr title="Alcohol By Volume">ABV</abbr>
              </TableCell>

              <TableCell>
                <abbr title="European Brewery Convention">EBC</abbr>
              </TableCell>
              <TableCell colSpan="2">
                <abbr title="Standard Reference Method">SRM</abbr>
              </TableCell>
              <TableCell>
                <abbr title="Potential of Hydrogen">pH</abbr>
              </TableCell>
              <TableCell>Attenuation level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{beer.abv}%</TableCell>

              <TableCell>{beer.ebc}</TableCell>
              <TableCell>{beer.srm}</TableCell>
              <TableCell
                style={{
                  width: '100px',
                  backgroundColor: SRMToRGBCSS(beer.srm),
                }}
              ></TableCell>
              <TableCell>{beer.ph}</TableCell>
              <TableCell>{beer.attenuation_level}%</TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell>
                Target <abbr title="Original Gravity">OG</abbr>
              </TableCell>
              <TableCell>
                Target <abbr title="Final Gravity">FG</abbr>
              </TableCell>
              <TableCell>
                Bitterness (
                <abbr title="International Bitterness Units">IBU</abbr>)
              </TableCell>
              <TableCell>Boil Volume</TableCell>
              <TableCell>Final Volume</TableCell>
              {settings.imperial_units ? (
                <TableCell>Energy (12 oz)</TableCell>
              ) : (
                <TableCell>Energy (355mL)</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{beer.target_og / 1000} SG</TableCell>
              <TableCell>{beer.target_fg / 1000} SG</TableCell>
              <TableCell>{beer.ibu}</TableCell>
              {settings.imperial_units ? (
                <TableCell>
                  {convertLitresToGallons(
                    beer.boil_volume.value
                  ).toLocaleString({ maximumFractionDigits: 2 })}{' '}
                  gallons
                </TableCell>
              ) : (
                <TableCell>
                  {beer.boil_volume.value} {beer.boil_volume.unit}
                </TableCell>
              )}
              {settings.imperial_units ? (
                <TableCell>
                  {convertLitresToGallons(beer.volume.value).toLocaleString({
                    maximumFractionDigits: 2,
                  })}{' '}
                  gallons
                </TableCell>
              ) : (
                <TableCell>
                  {beer.volume.value} {beer.volume.unit}
                </TableCell>
              )}
              {settings.calories ? (
                <TableCell>
                  {calories.toLocaleString({ maximumFractionDigits: 2 })}
                  {' kcal'}
                </TableCell>
              ) : (
                <TableCell>
                  {kilojoules.toLocaleString({
                    maximumFractionDigits: 2,
                  })}{' '}
                  kJ
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="h4" align="center">
          Ingredients
        </Typography>
        <Typography variant="body1" textAlign="center">
          <b>Tips:</b> {beer.brewers_tips}
        </Typography>
        <Typography variant="h5" align="center">
          Yeast
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">{beer.ingredients.yeast}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="h5" align="center">
          Malt
        </Typography>
        <Table>
          <TableBody>
            {beer.ingredients.malt.map((malt) => {
              return (
                <TableRow key={md5(malt.name + malt.amount.value)}>
                  <TableCell scope="col">{malt.name}</TableCell>
                  {settings.imperial_units ? (
                    <TableCell>
                      {convertKilogramsToPounds(
                        malt.amount.value
                      ).toLocaleString({
                        maximumFractionDigits: 2,
                      })}{' '}
                      pounds
                    </TableCell>
                  ) : (
                    <TableCell>
                      {malt.amount.value} {malt.amount.unit}
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Typography variant="h5" align="center">
          Hops
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Grams</TableCell>
              <TableCell>Add</TableCell>
              <TableCell>Attribute</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beer.ingredients.hops.map((hop) => {
              return (
                <TableRow
                  key={md5(
                    hop.name + hop.amount.value + hop.add + hop.attribute
                  )}
                >
                  <TableCell scope="row">
                    <a
                      href={`https://beermaverick.com/hop/${hop.name
                        .replace('-extract', '')
                        .replace(/\s+/g, '-')
                        .toLowerCase()}/`}
                      style={{ color: 'black' }}
                    >
                      {hop.name}
                    </a>
                  </TableCell>
                  {settings.ounces ? (
                    <TableCell>
                      {convertGToOz(hop.amount.value).toLocaleString({
                        maximumFractionDigits: 2,
                      })}{' '}
                      oz
                    </TableCell>
                  ) : (
                    <TableCell>{hop.amount.value} g</TableCell>
                  )}

                  <TableCell>{hop.add}</TableCell>
                  <TableCell>{hop.attribute}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Typography variant="h5" align="center">
          Methods/Timings
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan="2">Mash Temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell scope="col">Temperature</TableCell>
              <TableCell scope="col">Duration</TableCell>
            </TableRow>
            {beer.method.mash_temp.map((mash) => {
              return (
                <TableRow
                  key={md5(mash.temp.value + mash.temp.unit + mash.duration)}
                >
                  {settings.imperial_temperature ? (
                    <TableCell>{convertCToF(mash.temp.value)} °F</TableCell>
                  ) : (
                    <TableCell>{mash.temp.value} °C</TableCell>
                  )}
                  {mash.duration ? (
                    <TableCell>{mash.duration} min</TableCell>
                  ) : (
                    <TableCell>60 min</TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {beer.method.twist && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Twist</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{beer.method.twist}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>
    </Box>
  )
}

export default DisplayBeer
