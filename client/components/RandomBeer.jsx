import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Table } from 'react-bootstrap'

import { fetchRandomBeer, addFavourite, getSettings } from '../actions'

import {
  SRMToRGBCSS,
  calcCalories,
  convertCToF,
  convertLitresToGallons,
  convertKilogramsToPounds,
  convertGToOz,
} from './Utils'

import Hash from 'hash-string'

function RandomBeer() {
  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSettings())
  }, [])

  const randomBeer = useSelector((state) => state.randomBeer)
  const [isFavourite, setIsFavourite] = useState('secondary')

  const handleFavourite = (e) => {
    const beer = { brewdog_id: randomBeer[0].id, name: randomBeer[0].name }

    e.target.innerHTML = 'Saved to favourites!'

    setIsFavourite('success' + ' disabled')

    dispatch(addFavourite(beer))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(fetchRandomBeer())
  }

  return (
    <div className="container text-center">
      <Form>
        <Button variant="primary" onClick={handleSubmit}>
          Fetch Random Recipe
        </Button>
      </Form>
      {randomBeer?.map((beer) => {
        const calories = calcCalories(
          beer.target_og / 1000,
          beer.target_fg / 1000
        )
        const kilojoules = calories * 4.18

        return (
          <div key={Hash(beer)}>
            <div>
              <h1>
                #{beer.id} {beer.name}
              </h1>
              <div>
                <Button variant={isFavourite} onClick={handleFavourite}>
                  Save to favourites!
                </Button>
              </div>
              <h2>{beer.tagline}</h2>
              <p>{beer.description}</p>
              <h4>Food pairing</h4>
              <Table>
                <tbody>
                  <tr>
                    {beer.food_pairing.map((food) => (
                      <td key={Hash(food)}>{food}</td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </div>
            {/* TODO Fix formatting and layout of these tables */}
            <div>
              <Table>
                <tbody>
                  <tr>
                    <th>
                      <abbr title="Alcohol By Volume">ABV</abbr>
                    </th>

                    <th>
                      <abbr title="European Brewery Convention">EBC</abbr>
                    </th>
                    <th colSpan="2">
                      <abbr title="Standard Reference Method">SRM</abbr>
                    </th>
                    <th>
                      <abbr title="Potential of Hydrogen">pH</abbr>
                    </th>
                    <th>Attenuation level</th>
                  </tr>
                  <tr>
                    <td>{beer.abv}%</td>

                    <td>{beer.ebc}</td>
                    <td>{beer.srm}</td>
                    <td
                      style={{
                        width: '100px',
                        backgroundColor: SRMToRGBCSS(beer.srm),
                      }}
                    ></td>
                    <td>{beer.ph}</td>
                    <td>{beer.attenuation_level}%</td>
                  </tr>
                  <tr>
                    <th>
                      Target <abbr title="Original Gravity">OG</abbr>
                    </th>
                    <th>
                      Target <abbr title="Final Gravity">FG</abbr>
                    </th>
                    <th>
                      Bitterness (
                      <abbr title="International Bitterness Units">IBU</abbr>)
                    </th>
                    <th>Boil Volume</th>
                    <th>Final Volume</th>
                    {settings.imperial_units ? (
                      <th>Energy (12 oz)</th>
                    ) : (
                      <th>Energy (355mL)</th>
                    )}
                  </tr>
                  <tr>
                    <td>{beer.target_og / 1000} SG</td>
                    <td>{beer.target_fg / 1000} SG</td>
                    <td>{beer.ibu}</td>
                    {settings.imperial_units ? (
                      <td>
                        {convertLitresToGallons(
                          beer.boil_volume.value
                        ).toLocaleString({ maximumFractionDigits: 2 })}{' '}
                        gallons
                      </td>
                    ) : (
                      <td>
                        {beer.boil_volume.value} {beer.boil_volume.unit}
                      </td>
                    )}
                    {settings.imperial_units ? (
                      <td>
                        {convertLitresToGallons(
                          beer.volume.value
                        ).toLocaleString({ maximumFractionDigits: 2 })}{' '}
                        gallons
                      </td>
                    ) : (
                      <td>
                        {beer.volume.value} {beer.volume.unit}
                      </td>
                    )}
                    {settings.calories ? (
                      <td>
                        {calories.toLocaleString({ maximumFractionDigits: 2 })}
                        {' kcal'}
                      </td>
                    ) : (
                      <td>
                        {kilojoules.toLocaleString({
                          maximumFractionDigits: 2,
                        })}{' '}
                        kJ
                      </td>
                    )}
                  </tr>
                </tbody>
              </Table>

              <h3>Ingredients</h3>
              <p>{beer.brewers_tips}</p>
              <h4>Yeast</h4>
              <Table>
                <tbody>
                  <tr>
                    <th scope="row">Yeast</th>
                    <td>{beer.ingredients.yeast}</td>
                  </tr>
                </tbody>
              </Table>

              <h4>Malt</h4>
              <Table>
                <tbody>
                  {beer.ingredients.malt.map((malt) => {
                    return (
                      <tr key={Hash(malt.name + malt.amount.value)}>
                        <th scope="col">{malt.name}</th>
                        {settings.imperial_units ? (
                          <td>
                            {convertKilogramsToPounds(
                              malt.amount.value
                            ).toLocaleString({
                              maximumFractionDigits: 2,
                            })}{' '}
                            pounds
                          </td>
                        ) : (
                          <td>
                            {malt.amount.value} {malt.amount.unit}
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>

              <h4>Hops</h4>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Grams</th>
                    <th>Add</th>
                    <th>Attribute</th>
                  </tr>
                </thead>
                <tbody>
                  {beer.ingredients.hops.map((hop) => {
                    return (
                      <tr
                        key={Hash(
                          hop.name + hop.amount.value + hop.add + hop.attribute
                        )}
                      >
                        <th scope="row">
                          <a
                            href={`https://beermaverick.com/hop/${hop.name
                              .replace('-extract', '')
                              .replace(/\s+/g, '-')
                              .toLowerCase()}/`}
                            style={{ color: 'black' }}
                          >
                            {hop.name}
                          </a>
                        </th>
                        {settings.ounces ? (
                          <td>
                            {convertGToOz(hop.amount.value).toLocaleString({
                              maximumFractionDigits: 2,
                            })}{' '}
                            oz
                          </td>
                        ) : (
                          <td>{hop.amount.value} g</td>
                        )}

                        <td>{hop.add}</td>
                        <td>{hop.attribute}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>

              <h4>Methods/Timings</h4>
              <Table>
                <thead>
                  <tr>
                    <th colSpan="2">Mash Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="col">Temperature</th>
                    <th scope="col">Duration</th>
                  </tr>
                  {beer.method.mash_temp.map((mash) => {
                    return (
                      <tr
                        key={Hash(
                          mash.temp.value + mash.temp.unit + mash.duration
                        )}
                      >
                        {settings.imperial_temperature ? (
                          <td>{convertCToF(mash.temp.value)} °F</td>
                        ) : (
                          <td>{mash.temp.value} °C</td>
                        )}
                        {mash.duration ? (
                          <td>{mash.duration} min</td>
                        ) : (
                          <td>60 min</td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>

              {beer.method.twist && (
                <Table>
                  <thead>
                    <tr>
                      <th colSpan="2">Twist</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Twist</th>
                      <td>{beer.method.twist}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RandomBeer
