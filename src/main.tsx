// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

console.log(`basePath is ${import.meta.env.BASE_URL }`)
fetch(`${import.meta.env.BASE_URL || './'}config.json`).then(resp => resp.json()).then(config => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<BrowserRouter basename={config.app.basePath}>
    <App appConfig={config} />
  </BrowserRouter>)
}).catch(err => console.log('The config file fetching failed: ', err))