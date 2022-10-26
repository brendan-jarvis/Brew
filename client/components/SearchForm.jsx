import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Container,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

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

  const abvMarks = [0, 5, 10, 15, 20, 25, 30].map((value) => {
    return {
      value: value,
      label: value,
    }
  })

  const ibuMarks = [0, 25, 50, 75, 100, 125, 150].map((value) => {
    return {
      value: value,
      label: value,
    }
  })

  const ebcMarks = [0, 5, 10, 20, 30, 40, 50].map((value) => {
    return {
      value: value,
      label: value,
    }
  })

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
    <Container>
      <form>
        <Stack spacing={2}>
          <Typography id="input-slider">ABV Range</Typography>
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
            label="ABV Range"
          />
          <Typography id="input-slider">IBU Range</Typography>
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
            label="IBU Range"
          />
          <Typography id="input-slider">EBC Range</Typography>
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
            label="EBC Range"
          />
          <TextField
            type="text"
            name="name"
            id="name"
            value={query.name}
            onChange={handleChange}
            label="Name"
          />
          <TextField
            type="text"
            name="malt"
            id="malt"
            value={query.malt}
            onChange={handleChange}
            label="Malt"
          />
          <TextField
            type="text"
            name="hops"
            id="hops"
            value={query.hops}
            onChange={handleChange}
            label="Hops"
          />
          <TextField
            type="text"
            name="yeast"
            id="yeast"
            value={query.yeast}
            onChange={handleChange}
            label="Yeast"
          />
          <Button
            variant="contained"
            value="Search for Recipes"
            onClick={handleSearchSubmit}
          >
            Submit
          </Button>
        </Stack>
      </form>

      {<SearchResults />}
    </Container>
  )
}

export default SearchForm
