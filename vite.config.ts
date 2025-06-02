// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react-swc'
import 'dotenv/config'
import { defineConfig } from 'vite'
import defaultConfig from './app.config.json' assert { type: 'json' }
import { mergeEnvVars } from './merge-env-vars.mjs'
import fs from 'fs'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const envConfig = mergeEnvVars(defaultConfig)
  return {
    base: (isProd && envConfig.app.basePath) ? `${envConfig.app.basePath}/` : '/',
    css: { preprocessorOptions: { scss: { api: 'modern' } } },
    build: { sourcemap: true },
    server: {
      // https: {
      //   key: fs.readFileSync('./eng/docker-compose/ssl/server.key'),
      //   cert: fs.readFileSync('./eng/docker-compose/ssl/server.crt')
      // },
      host: true,
      port: +(process.env.PORT || 8598),
      watch: {
        ignored: [
          '!**/dist/**',
          '!**/node_modules/**'
        ]
      }
    },
    plugins: [
      {
        mode: 'pre',
        ...mdx({ include: 'src/docs/**/*.md', }) 
      },
      react()
    ]
  }
})