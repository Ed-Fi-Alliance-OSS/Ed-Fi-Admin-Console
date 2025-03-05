// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Route } from '@edfi/admin-console-shared-sdk'

interface AppRoute {
    home: Route
    // onBoardingWizard: Route
    // setUpWizard: Route
    console: Route
    instance: Route
    addInstance: Route
    stateSummary: Route
    debug: Route
    authCallback: Route
    internalError: Route
    unauthorized: Route
    notFound: Route
}

const routes: AppRoute = {
  home: {
    url: '/',
    name: 'Home' 
  },
  // onBoardingWizard: {
  //   url: '/onBoarding',
  //   name: 'On Boarding Wizard' 
  // },
  // setUpWizard: {
  //   url: '/setupwizard',
  //   name: 'Set Up Wizard' 
  // },
  console: {
    url: '/console',
    name: 'Console' 
  },
  instance: {
    url: '/instance/:odsInstanceId',
    name: 'Instance' 
  },
  addInstance: {
    url: '/addInstance',
    name: 'Add Instance' 
  },
  debug: {
    url: '/debug',
    name: 'Debug' 
  },
  stateSummary: {
    url: '/summary',
    name: 'Summary' 
  },
  authCallback: {
    url: '/callback',
    name: 'Auth Callback' 
  },
  internalError: {
    url: '/server-error',
    name: 'Internal Server Error' 
  },
  unauthorized: {
    url: '/unauthorized',
    name: 'Unauthorized' 
  },
  notFound: {
    url: '/not-found',
    name: 'Not Found' 
  }
}

export default routes