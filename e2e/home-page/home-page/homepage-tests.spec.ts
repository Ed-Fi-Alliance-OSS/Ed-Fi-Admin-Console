// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect, Page 
} from '@playwright/test'
import { routes } from '../../core/routes'

let page: Page

test.describe('Home Page Tests', () => {

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(routes.home)
    await page.waitForURL(routes.home)
    await page.waitForLoadState('networkidle')
  })

  test('Home page should show Admin Actions Title', async () => {
    await expect(page.getByText('Admin Actions')).toBeVisible({ timeout: 15000 })
  })

  test('Should show every Admin Actions button as clickable', async () => {
    const manageUserAction = page.locator('a', { hasText: 'Manage Users' })
    await expect(manageUserAction).toBeVisible({ timeout: 15000 })
    await expect(manageUserAction).toBeEnabled()

    const userSyncAction = page.locator('a', { hasText: 'User Sync' })
    await expect(userSyncAction).toBeVisible()
    await expect(userSyncAction).toBeEnabled()

    const districtSettingsActions = page.locator('a', { hasText: 'District/Charter School Settings' })
    await expect(districtSettingsActions).toBeVisible()
    await expect(districtSettingsActions).toBeEnabled()

    const ssoAction = page.locator('a', { hasText: 'SSO' })
    await expect(ssoAction).toBeVisible()
    await expect(ssoAction).toBeEnabled()
  })

  test('Home page should show ODS Instances Title', async () => {
    await expect(page.getByText('ODS Instances')).toBeVisible({ timeout: 15000 })
  })

  //Sorting by year works


})