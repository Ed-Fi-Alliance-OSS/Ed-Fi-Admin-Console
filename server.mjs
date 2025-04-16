// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import history from 'connect-history-api-fallback'
import 'dotenv/config'
import express from 'express'
import path from 'path'
import { cloneDeep } from 'lodash-es'
import defaultConfig from './app.config.json' assert { type: 'json' }
import { mergeEnvVars } from './merge-env-vars.mjs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const originalConfig = mergeEnvVars(defaultConfig)
let config = cloneDeep(originalConfig)
const staticFileMiddleware = express.static('dist')


app.use(staticFileMiddleware)

// This code makes sure that any request that does not matches a static file
// in the dist folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map|.json)$/i.test(req.path)) {
      next();
  } else {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.use(`/config.json`, (_, res) => {
  res.json(config)
})


app.use(history({
  disableDotRule: true,
  index: `/index.html`,
  verbose: true
}))


app.listen(process.env.PORT || 8598, () => {
  console.table(config.api)
  console.table(config.app)
  console.table(config.auth)
  console.log(`Server running at http://localhost:${process.env.PORT || 8598}${config.app.basePath}`)
})