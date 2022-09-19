const conn = require('./connection')

function getSettings(db = conn) {
  return db('settings').select().first()
}

function editSettings(setting, db = conn) {
  return db('settings').update(setting)
}

module.exports = {
  getSettings,
  editSettings,
}
