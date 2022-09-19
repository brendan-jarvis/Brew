const express = require('express')
const router = express.Router()
const db = require('../db/favourites')

// GET /api/v1/
router.get('/:id', async (req, res) => {
  try {
    const result = await db.getFavourite(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
