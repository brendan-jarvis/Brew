import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Hash from 'hash-string'
import { Form, Table, Button } from 'react-bootstrap'

function Favourites() {
  const favourites = useSelector((state) => state.favourites)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavourites())
  }, [])

  const handleClick = (id) => {
    dispatch(deleteBeerFromFavourites(id))
  }

  return (
    <div className="container">
      <h1>Favourites</h1>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>BrewDog ID</th>
            <th>Name</th>
            <th>Added On</th>
            <th>Brewed</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {favourites?.map((beer) => {
            const brewedBool = Boolean(beer.brewed)

            return (
              <tr key={Hash(beer.id + beer.name)}>
                <td>{beer.id}</td>
                <td>{beer.brewdog_id}</td>
                <td>
                  <a href={`/beer/${beer.brewdog_id}`} className="link-dark">
                    {beer.name}
                  </a>
                </td>
                <td>{new Date(beer.created_at).toLocaleDateString()}</td>
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
                    checked={brewedBool}
                    onChange={() =>
                      dispatch(
                        editFavourite(beer.id, {
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
                    onClick={() => handleClick(beer.id)}
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
