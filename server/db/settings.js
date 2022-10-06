const conn = require('./connection')

function getSettings(db = conn) {
  console.log('getSettings db', db)
  return db('settings').select().first()
}

function editSettings(setting, db = conn) {
  return db('settings').update(setting)
}

module.exports = {
  getSettings,
  editSettings,
}
