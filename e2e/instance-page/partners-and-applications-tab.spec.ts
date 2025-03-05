// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.


import {
  test, expect 
} from '@playwright/test'
import { routes } from '../core/routes'

test.beforeEach(async ({ page }) => {
  await page.goto(routes.instance)
  await page.waitForURL(routes.instance)

  await page.getByText('Vendors & Applications').click()
})

/*
test("Shows the list of applications table", async ({  page }) => {
    expect(page.url()).toBe(routes.instance)

    await page.waitForLoadState("networkidle")

    await expect(page.getByText("0 items to show")).not.toBeVisible()
    await expect(page.getByText("Texas Exchange")).toBeVisible()
})
    */