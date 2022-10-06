import request from 'superagent'

export async function getSettingsApi() {
  const res = await request.get('/api/v1/settings')
  console.log('get settings', res)
  return res.body
}

export async function editSettingsApi(settings) {
  const res = await request.patch('/api/v1/settings/').send(settings)
  return res.body
}
