// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect 
} from '@playwright/test'
import { baseUrl } from '../core/routes'

test('Displays 404 NotFound When Route Does Not Exist', async ({ page }) => {
  const nonExistentRoute = `${baseUrl}/random123`

  await page.goto(nonExistentRoute)
  await page.waitForLoadState('networkidle')

  const notFound404 = page.locator('text=404')
  await expect(notFound404).toBeVisible({ timeout: 30000 })

  const notFoundText = page.locator('text=Not Found')
  await expect(notFoundText).toBeVisible()
})