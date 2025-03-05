// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test as setup, expect 
} from '@playwright/test'
import LoginPage  from './pages/login-page'
import  { userinfo } from './user-info'


const authFile = 'playwright/.auth/user.json'

setup('Authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigateToLogin()
  await loginPage.login(userinfo.username, userinfo.password)
  await page.context().storageState({ path: authFile })
})