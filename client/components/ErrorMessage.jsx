import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertTitle } from '@mui/material'

function ErrorMessage() {
  const errorMessage = useSelector((state) => state.errorMessage)

  if (errorMessage) {
    return (
      <Alert severity="error" className="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    )
  } else {
    return null
  }
}

export default ErrorMessage
