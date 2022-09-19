const express = require('express')
const router = express.Router()
const db = require('../db/settings')

// GET /api/v1/
router.get('/', async (req, res) => {
  try {
    const result = await db.getSettings()
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/', async (req, res) => {
  try {
    const result = await db.editSettings(req.body)
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
