// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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