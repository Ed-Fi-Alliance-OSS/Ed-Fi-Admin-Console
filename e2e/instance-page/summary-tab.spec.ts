// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect 
} from '@playwright/test'
import { routes } from '../core/routes'

test.beforeEach(async ({ page }) => {
  await page.goto(routes.home)
  await page.waitForURL(routes.home)
  await page.waitForLoadState('networkidle')
  await page.getByText('2023 - 2024').click()
  await page.waitForURL(routes.instance)
})

test('Should show instance data if Onboarding Wizard has been finished', async ({ page }) => {
  await page.getByRole('tab', { name: 'Summary' }).waitFor()
  await page.getByRole('tab', { name: 'Summary' }).click()

  await expect(page.getByText('Ed-Fi Base URL')).toBeVisible({ timeout: 15000 })
  await expect(page.getByText('Ed-Fi Version')).toBeVisible()
  await expect(page.getByText('TSDS Version')).toBeVisible()
  await expect(page.getByText('Ed-Fi Status')).toBeVisible()
  await expect(page.getByText('Hosting')).toBeVisible()
})
