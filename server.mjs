import express from 'express'
import history from 'connect-history-api-fallback'
import 'dotenv/config'
import { cloneDeep } from 'lodash-es'
import {
  mergeEnvVars
} from './merge-env-vars.mjs'
import defaultConfig from './app.config.json' assert { type: 'json' }

const app = express()
const cors = require('cors');
const originalConfig = mergeEnvVars(defaultConfig)
let config = cloneDeep(originalConfig)
const staticFileMiddleware = express.static('dist')

app.use(cors({ credentials: true }))

app.use(`${config.app.basePath}/config.json`, (_, res) => {
  res.json(config)
})

app.use(history({
  index: `${config.app.basePath}/index.html`,
  verbose: true,
}))

app.use(config.app.basePath, staticFileMiddleware)

app.listen(process.env.PORT || 8598, () => {
  console.table(config.app)
  console.log(config.app.basePath)
  console.log(process.env.PORT)
  console.log(`Server running at http://localhost:${process.env.PORT || 8598}${config.app.basePath}`)
})