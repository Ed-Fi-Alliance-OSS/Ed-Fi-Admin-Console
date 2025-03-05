// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

const fs = require('fs')
const appConfig = require('./app.config.json')
const localConfigFile = './local.config.json'

function mapLocalConfig (data) {
  const localConfigJson = JSON.parse(data)
  const configKeys = Object.keys(localConfigJson)
  const nfrontendConfig = { ...appConfig }

  for (let key of configKeys) {
    nfrontendConfig[key] = localConfigJson[key]
  }

  console.log('Map local config')

  return nfrontendConfig
}

function mapDevConfig (data) {
  const devConfigJson = JSON.parse(data)
  const configKeys = Object.keys(devConfigJson)
  const nfrontendConfig = { ...devConfigJson }

  for (let key of configKeys) {
    nfrontendConfig[key] = devConfigJson[key]
  }

  console.log('Map dev config')

  return nfrontendConfig
}

function mergeConfig () {
  try {
    const localConfigExists = fs.existsSync(localConfigFile)
    let config = null

    if (localConfigExists) {
      const file = fs.readFileSync(localConfigFile, 'utf-8')
      config = mapLocalConfig(file)

      return config
    } else {
      const file = fs.readFileSync(appConfigFile, 'utf-8')
      console.log('app config file', appConfigFile)
      config = mapDevConfig(file)
            
      return config
    }
  } catch(ex) {
    console.log('Error', ex)
  }
}

function mapConfigs () {
  console.log('Map configs')
  return mergeConfig()
}

module.exports = mapConfigs