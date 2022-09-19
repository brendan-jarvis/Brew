import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, FormControlLabel } from '@mui/material'
import { Form, Row } from 'react-bootstrap'

import { editSettings, getSettings } from '../actions'

function Settings() {
  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSettings())
  }, [])

  const handleChange = (e) => {
    dispatch(
      editSettings({
        ...settings,
        [e.target.name]: e.target.checked,
      })
    )
  }

  return (
    <Form className="mx-auto">
      <Form.Group as={Row}>
        <FormControlLabel
          className="justify-content-md-center"
          control={
            <Switch
              aria-label="Fahrenheit"
              checked={Boolean(settings.imperial_temperature)}
              name="imperial_temperature"
              onChange={handleChange}
              color="primary"
            />
          }
          label="Fahrenheit"
        />
        <FormControlLabel
          className="justify-content-md-center"
          control={
            <Switch
              aria-label="Imperial Units"
              checked={Boolean(settings.imperial_units)}
              name="imperial_units"
              onChange={handleChange}
              color="primary"
            />
          }
          label="Imperial Units"
        />
        <FormControlLabel
          className="justify-content-md-center"
          control={
            <Switch
              aria-label="Ounces"
              checked={Boolean(settings.ounces)}
              name="ounces"
              onChange={handleChange}
              color="primary"
            />
          }
          label="Ounces"
        />
        <FormControlLabel
          className="justify-content-md-center"
          control={
            <Switch
              aria-label="Calories"
              checked={Boolean(settings.calories)}
              name="calories"
              onChange={handleChange}
              color="primary"
            />
          }
          label="Calories"
        />
      </Form.Group>
    </Form>
  )
}

export default Settings
