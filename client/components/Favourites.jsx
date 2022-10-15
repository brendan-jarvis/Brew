import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Table, Button } from 'react-bootstrap'
import { supabase } from '../utils/supabase'
import md5 from 'md5'

import { getFavourites, updateFavourite, deleteFavourite } from '../actions'

function Favourites() {
  const favourites = useSelector((state) => state.favourites)
  const session = supabase.auth.session()
  const dispatch = useDispatch()
  const { user } = session

  useEffect(() => {
    dispatch(getFavourites(user.id))
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteFavourite(id))
  }

  return (
    <div className="container">
      <h1>Favourites</h1>
      <Table hover>
        <thead>
          <tr>
            <th>BrewDog ID</th>
            <th>Name</th>
            <th>Added On</th>
            <th>Brewed</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {favourites?.map((beer) => {
            return (
              <tr key={md5(beer.id + beer.name)}>
                <td>{beer.brewdog_id}</td>
                <td>
                  <a href={`/beer/${beer.brewdog_id}`} className="link-dark">
                    {beer.name}
                  </a>
                </td>
                <td>
                  {new Date(beer.inserted_at).toLocaleDateString('en-NZ', {
                    timestyle: 'short',
                  })}
                </td>
                <td>
                  {/* <label htmlFor={beer.name + 'brewed'} hidden>
                    Brewed
                  </label>
                  <input
                    type="checkbox"
                    name={beer.name + 'brewed'}
                    id={beer.id}
                    checked={Boolean(beer.brewed)}
                  /> */}
                  <Form.Check
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
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(beer.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Favourites
