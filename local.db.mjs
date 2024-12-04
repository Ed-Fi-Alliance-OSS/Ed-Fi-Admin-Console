import 'dotenv/config'
import express from 'express'
import jsonServer from 'json-server'

const app = express()

app.use('/api', (req, res, next) => {
  req.body = req.body || {}
  req.body = {
    ...req.body,
    id: Date.now() + '-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  }

  next()
}, jsonServer.defaults({
  bodyParser: true,
  logger: true 
}), jsonServer.router('./mockdata/adminapi/db.json'))

const PORT = 3000

app.listen(PORT, () => {
  console.log(`DB running at http://localhost:${PORT}`)
})