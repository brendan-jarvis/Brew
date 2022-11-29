import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import {
  Alert,
  Box,
  LinearProgress,
  Container,
  Typography,
  Divider,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { calcCalories } from 'brewcalc'

const ViewRecipe = ({ session }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getRecipe()
  }, [id])

  const getRecipe = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('recipes')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        if (session.user) {
          setErrorMessage(error.message)
        } else {
          setErrorMessage('You must be logged in to view this recipe')
        }
        throw error
      }

      if (data) {
        setRecipe(data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const beerjson = recipe?.recipe.beerjson.recipes[0] ?? null

  return (
    <Container>
      {errorMessage ? (
        <>
          <Alert severity="error">{errorMessage}</Alert>
          <Typography variant="h2" textAlign="center">
            Sorry, we couldn&apos;t find that recipe!
          </Typography>
        </>
      ) : loading ? (
        <Box textAlign="center">
          <LinearProgress color="secondary" sx={{ mt: -1 }}>
            <span className="visually-hidden">Loading...</span>
          </LinearProgress>
        </Box>
      ) : (
        <>
          <Typography variant="h1" textAlign="center">
            {recipe?.name}
          </Typography>

          {recipe?.updated_at != recipe?.inserted_at ? (
            <Typography variant="subtitle1" textAlign="center">
              Uploaded by{' '}
              <NavLink to={`/profiles/${recipe?.author_username}`}>
                {recipe?.author_username}
              </NavLink>{' '}
              on {new Date(recipe?.updated_at).toDateString()}
            </Typography>
          ) : (
            <>
              <Typography variant="subtitle1" textAlign="center">
                Uploaded by{' '}
                <NavLink to={`/profiles/${recipe?.author_username}`}>
                  {recipe?.author_username}
                </NavLink>{' '}
                on {new Date(recipe?.updated_at).toDateString()}.
              </Typography>
              <Typography variant="subtitle1" textAlign="center">
                Last updated on {new Date(recipe?.inserted_at).toDateString()}.
              </Typography>
            </>
          )}
          <Box textAlign="center">
            <Paper sx={{ textAlign: 'left', p: 1 }}>
              <Typography variant="h2" sx={{ textAlign: 'center' }}>
                Stats
              </Typography>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  Brewer:
                </Box>{' '}
                {beerjson?.author}
              </Typography>
              <Typography
                variant="body1"
                style={{ textTransform: 'capitalize' }}
              >
                <Box component="span" fontWeight="bold">
                  Method:
                </Box>{' '}
                {beerjson?.type}
              </Typography>
              <Typography
                variant="body1"
                style={{ textTransform: 'capitalize' }}
              >
                <Box component="span" fontWeight="bold">
                  Style:
                </Box>{' '}
                {beerjson?.style.name} ({beerjson?.style.type}),{' '}
                {beerjson?.style.style_guide +
                  ' ' +
                  beerjson?.style.category_number +
                  beerjson?.style.style_letter}
              </Typography>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  Boil Time:
                </Box>{' '}
                {beerjson?.boil.boil_time.value} {beerjson?.boil.boil_time.unit}
              </Typography>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  Batch Size:
                </Box>{' '}
                {beerjson?.batch_size.value} {beerjson?.batch_size.unit}
              </Typography>
              {/* TODO: calculate preboil size               
                
                <Typography variant="body1">
                  Pre Boil Size: {beerjson?.pre_boil_size} gallons
                </Typography> */}
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  Original Gravity:
                </Box>{' '}
                {beerjson?.original_gravity.value}{' '}
                {beerjson?.original_gravity.unit}
              </Typography>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  Final Gravity:
                </Box>{' '}
                {beerjson?.final_gravity?.value} {beerjson?.final_gravity?.unit}
              </Typography>
              {/* TODO: calculate brewhouse efficiency

                <Typography variant="body1">
                  Efficiency: {beerjson?.efficiency}% (brew house)
                </Typography> */}
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">
                  Notes:
                </Box>{' '}
                {beerjson?.notes}
              </Typography>

              {beerjson?.final_gravity && (
                <Typography variant="body1">
                  <Box component="span" fontWeight="bold">
                    Calories:
                  </Box>{' '}
                  {Math.round(
                    calcCalories(
                      beerjson?.original_gravity.value,
                      beerjson?.final_gravity?.value
                    )
                  )}{' '}
                  calories
                </Typography>
              )}
            </Paper>

            <Divider />

            <Typography variant="h2">Fermentables</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Producer</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beerjson?.ingredients.fermentable_additions.map(
                  (fermentable) => (
                    <TableRow key={fermentable.name}>
                      <TableCell>
                        {fermentable.amount.unit === 'g'
                          ? fermentable.amount.value / 1000 + ' kg'
                          : fermentable.amount.value +
                            ' ' +
                            fermentable.amount.unit}
                      </TableCell>
                      <TableCell style={{ textTransform: 'capitalize' }}>
                        {fermentable.name}
                      </TableCell>
                      <TableCell style={{ textTransform: 'capitalize' }}>
                        {fermentable.producer}
                      </TableCell>
                      <TableCell style={{ textTransform: 'capitalize' }}>
                        {fermentable.type}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>

            <Divider />

            <Typography variant="h2">Hops</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Variety</TableCell>
                  <TableCell>Form</TableCell>
                  <TableCell>Alpha Acid</TableCell>
                  <TableCell>Use</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beerjson?.ingredients.hop_additions.map((hop) => (
                  <TableRow key={hop.name + hop.timing.duration.value}>
                    <TableCell>
                      {hop.amount.value} {hop.amount.unit}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {hop.name}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {hop.form}
                    </TableCell>
                    <TableCell>
                      {hop.alpha_acid.value} {hop.alpha_acid.unit}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {hop.timing.use.replaceAll('_', ' ')}
                    </TableCell>
                    <TableCell>
                      {hop.timing.duration.value} {hop.timing.duration.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider />

            <Typography variant="h2">Mash Steps</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell style={{ textTransform: 'capitalize' }}>
                    Type
                  </TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beerjson?.mash.mash_steps.map((step) => (
                  <TableRow key={step.type + step.step_time.value}>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {step.amount.value} {step.amount.unit}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {step.type}
                    </TableCell>
                    <TableCell>
                      {step.step_temperature.value} {step.step_temperature.unit}
                    </TableCell>
                    <TableCell>
                      {step.step_time.value} {step.step_time.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider />

            {beerjson?.ingredients.miscellaneous_additions.length > 0 && (
              <>
                <Typography variant="h2">Miscellaneous Additions</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Amount</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell style={{ textTransform: 'capitalize' }}>
                        Type
                      </TableCell>
                      <TableCell>Use</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {beerjson?.ingredients.miscellaneous_additions?.map(
                      (step) => (
                        <TableRow key={step.name + step.timing.duration.value}>
                          <TableCell>
                            {step.amount.value} {step.amount.unit}
                          </TableCell>
                          <TableCell style={{ textTransform: 'capitalize' }}>
                            {step.name}
                          </TableCell>
                          <TableCell style={{ textTransform: 'capitalize' }}>
                            {step.type}
                          </TableCell>
                          <TableCell style={{ textTransform: 'capitalize' }}>
                            {step.timing.use.replaceAll('_', ' ')}
                          </TableCell>
                          <TableCell>
                            {step.timing.duration.value}{' '}
                            {step.timing.duration.unit}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </>
            )}

            <Divider />

            <Typography variant="h2">Yeast</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Form</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Producer</TableCell>
                  {/* TODO: Add attenuation
                
                <TableCell>Attenuation</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {beerjson?.ingredients.culture_additions.map((culture) => (
                  <TableRow key={culture.name}>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {culture.name}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {culture.form}
                    </TableCell>
                    <TableCell>
                      {culture.amount.value} {culture.amount.unit}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {culture.type}
                    </TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {culture.producer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Divider />
            {beerjson?.ingredients.water_additions && (
              <>
                <Typography variant="h2">Water Profile</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>
                        Calcium Ca<sup>+2</sup>
                      </TableCell>
                      <TableCell>
                        Magnesium Mg<sup>+2</sup>
                      </TableCell>
                      <TableCell>
                        Sodium Na<sup>+</sup>
                      </TableCell>
                      <TableCell>
                        Chloride Cl<sup>-</sup>
                      </TableCell>
                      <TableCell>
                        Sulfate SO<sub>4</sub>
                        <sup>-2</sup>
                      </TableCell>
                      <TableCell>
                        Bicarbonate HCO<sub>3</sub>
                        <sup>-</sup>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {beerjson?.ingredients.water_additions?.map((water) => (
                      <TableRow key={water.name}>
                        <TableCell style={{ textTransform: 'capitalize' }}>
                          {water.name}
                        </TableCell>
                        <TableCell>
                          {water.calcium.value} {water.calcium.unit}
                        </TableCell>
                        <TableCell>
                          {water.magnesium.value} {water.magnesium.unit}
                        </TableCell>
                        <TableCell>
                          {water.sodium.value} {water.sodium.unit}
                        </TableCell>
                        <TableCell>
                          {water.chloride.value} {water.chloride.unit}
                        </TableCell>
                        <TableCell>
                          {water.sulfate.value} {water.sulfate.unit}
                        </TableCell>
                        <TableCell>
                          {water.bicarbonate.value} {water.bicarbonate.unit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            <Divider />

            <Typography variant="h2">Fermentation</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Temperature</TableCell>
                  <TableCell>Free rise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beerjson?.fermentation.fermentation_steps.map((step) => (
                  <TableRow key={step.start_temperature.value}>
                    <TableCell style={{ textTransform: 'capitalize' }}>
                      {step.start_temperature.value}{' '}
                      {step.start_temperature.unit}
                    </TableCell>
                    <TableCell>{step.free_rise ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      )}
    </Container>
  )
}

export default ViewRecipe
