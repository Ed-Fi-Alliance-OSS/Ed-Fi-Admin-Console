// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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

app.use(`${config.app.basePath}/api`, (req, res, next) => {
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

app.use(history({
  disableDotRule: true,
  index: `${config.app.basePath}/index.html`,
  verbose: true,
  rewrites: [
    {from: /\/config.json/, to: `${config.app.basePath}/config.json`}
  ]
}))

app.use(config.app.basePath, staticFileMiddleware)

app.listen(process.env.PORT || 8598, () => {
  console.table(config.api)
  console.table(config.app)
  console.table(config.auth)
  console.log(`Server running at http://localhost:${process.env.PORT || 8598}${config.app.basePath}`)
})