import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, FormControlLabel, Avatar } from '@mui/material'
import { Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import md5 from 'md5'

import { getSettings, editSettings } from '../actions'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const settings = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
    // If session null redirect to /auth
    if (!session) {
      navigate('/auth')
    }

    dispatch(getSettings())
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const { user } = session

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = (e) => {
    dispatch(
      editSettings({
        ...settings,
        [e.target.name]: e.target.checked,
      })
    )
  }

  return (
    <div aria-live="polite">
      {loading ? (
        'Saving ...'
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <h1>Profile</h1>
          <div>
            Avatar:
            <Avatar
              variant="square"
              src={
                avatar_url
                  ? avatar_url
                  : `https://www.gravatar.com/avatar/${md5(session.user.email)}`
              }
              alt={`${username} avatar`}
            />
          </div>
          <div>Email: {session.user.email}</div>
          <div>
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              type="text"
              value={avatar_url || ''}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <button className="button primary block" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
      )}
      <button
        type="button"
        className="button block"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </button>

      <h2>Settings</h2>
      <Form className="mx-auto">
        <Form.Group as={Row}>
          <FormControlLabel
            className="justify-content-md-center"
            control={
              <Switch
                aria-label="Fahrenheit"
                checked={Boolean(settings.imperial_temperature)}
                name="imperial_temperature"
                onChange={updateSettings}
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
                onChange={updateSettings}
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
                onChange={updateSettings}
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
                onChange={updateSettings}
                color="primary"
              />
            }
            label="Calories"
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default Account
