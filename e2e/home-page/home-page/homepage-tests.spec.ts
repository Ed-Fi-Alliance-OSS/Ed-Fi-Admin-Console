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
    await page.waitForLoadState('networkidle', { timeout: 35000 })
  })

  test('Home page should show Admin Actions Title', async () => {
    await expect(page.getByText('Admin Actions')).toBeVisible({ timeout: 15000 })
  })

  test('Should show every Admin Actions button as clickable', async () => {
    const tenantInstanceAction = page.locator('a:has-text("Tenant Instance Settings")')
    await expect(tenantInstanceAction).toBeVisible({ timeout: 15000 })
    await expect(tenantInstanceAction).toBeEnabled()

    await expect(page.getByLabel('District/Charter School', { exact: true })).toContainText('Tenant Instance:')
  })

  test('Home page should show ODS Instances Title', async () => {
    await expect(page.getByText('Instances')).toBeVisible({ timeout: 15000 })
  })
})