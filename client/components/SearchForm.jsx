import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Slider } from '@mui/material'
import { Button, Form, Row } from 'react-bootstrap'

// Actions
import { searchBeerRecipes } from '../actions'

// Components
import SearchResults from './SearchResults'

function SearchForm() {
  const dispatch = useDispatch()

  // abv range 0 to 56
  // ibu range 0 to 1158
  // ebc range 0 to 601
  const [query, setQuery] = useState({
    abv: [0, 30],
    ibu: [0, 150],
    ebc: [0, 50],
    hops: '',
    malt: '',
    yeast: '',
    name: '',
  })

  const abvMarks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 5,
      label: '5%',
    },
    {
      value: 10,
      label: '10%',
    },
    {
      value: 15,
      label: '15%',
    },
    {
      value: 20,
      label: '20%',
    },
    {
      value: 25,
      label: '25%',
    },
    {
      value: 30,
      label: '30%',
    },
  ]

  const ibuMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 25,
      label: '25',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 75,
      label: '75',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 125,
      label: '125',
    },
    {
      value: 150,
      label: '150',
    },
  ]

  const ebcMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 50,
      label: '50',
    },
  ]

  const handleChange = (evt) => {
    // const key = evt.target.name

    setQuery({
      ...query,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleChangeAbv = (event, newValue) => {
    setQuery({ ...query, abv: newValue })
  }

  const handleChangeIbu = (event, newValue) => {
    setQuery({ ...query, ibu: newValue })
  }

  const handleChangeEbc = (event, newValue) => {
    setQuery({ ...query, ebc: newValue })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    dispatch(searchBeerRecipes(query))
  }

  return (
    <div className="container">
      <Form as={Row}>
        <Form.Group>
          <Form.Label htmlFor="ABV range">ABV:</Form.Label>

          <Slider
            getAriaLabel={() => 'ABV range'}
            value={query.abv}
            min={0}
            step={1}
            max={30}
            marks={abvMarks}
            valueLabelDisplay="auto"
            onChange={handleChangeAbv}
            getAriaValueText={() => `${query.abv}%`}
          />
          <Form.Label htmlFor="IBU range">IBU:</Form.Label>
          <Slider
            getAriaLabel={() => 'IBU range'}
            value={query.ibu}
            min={0}
            step={1}
            max={150}
            marks={ibuMarks}
            valueLabelDisplay="auto"
            onChange={handleChangeIbu}
            getAriaValueText={() => `${query.ibu}`}
          />
          <Form.Label htmlFor="EBC range">EBC:</Form.Label>
          <Slider
            getAriaLabel={() => 'EBC range'}
            value={query.ebc}
            min={0}
            step={1}
            max={50}
            marks={ebcMarks}
            valueLabelDisplay="auto"
            onChange={handleChangeEbc}
            getAriaValueText={() => `${query.ebu}`}
          />
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            value={query.name}
            onChange={handleChange}
          />
          <Form.Label htmlFor="malt">Malt:</Form.Label>
          <Form.Control
            type="text"
            name="malt"
            id="malt"
            value={query.malt}
            onChange={handleChange}
          />
          <Form.Label htmlFor="hops">Hops:</Form.Label>
          <Form.Control
            type="text"
            name="hops"
            id="hops"
            value={query.hops}
            onChange={handleChange}
          />
          <Form.Label htmlFor="yeast">Yeast:</Form.Label>
          <Form.Control
            type="text"
            name="yeast"
            id="yeast"
            value={query.yeast}
            onChange={handleChange}
          />
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              value="Search for Recipes"
              onClick={handleSearchSubmit}
            >
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>

      {<SearchResults />}
    </div>
  )
}

export default SearchForm
