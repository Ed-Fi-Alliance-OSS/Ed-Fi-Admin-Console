import history from 'connect-history-api-fallback'
import 'dotenv/config'
import express from 'express'
import jsonServer from 'json-server'
import { cloneDeep } from 'lodash-es'
import defaultConfig from './app.config.json' assert { type: 'json' }
import { mergeEnvVars } from './merge-env-vars.mjs'

const app = express()
const originalConfig = mergeEnvVars(defaultConfig)
let config = cloneDeep(originalConfig)
const staticFileMiddleware = express.static('dist')

app.use(`${config.app.basePath}/config.json`, (_, res) => {
  res.json(config)
})

app.use(history({
  index: `${config.app.basePath}/index.html`,
  verbose: true,
}))

app.use(config.app.basePath, staticFileMiddleware)
app.use('/api', (req, res, next) => {
  req.body = req.body || {}
  req.body = {
    ...req.body,
    id: Date.now() + '-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  }

  next()
}, jsonServer.defaults({
  bodyParser: true,
  logger: true,
  noCors: true 
}), jsonServer.router('./mockdata/adminapi/db.json'))

app.listen(process.env.PORT || 8598, () => {
  console.table(config.app)
  console.log(config.app.basePath)
  console.log(process.env.PORT)
  console.log(`Server running at http://localhost:${process.env.PORT || 8598}${config.app.basePath}`)
})