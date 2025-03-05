// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect 
} from '@playwright/test'
import { routes } from '../../core/routes'

/*
test.beforeEach(async ({ page }) => {
  await page.goto(routes.home);
  await page.waitForURL(routes.home);
  await page.goto(routes.console);
  await page.waitForURL(routes.console);
  await expect(page.getByText("Admin Actions")).toBeVisible();
  const docs = await page.getByText("Documentation (Advanced)");
  await docs.click();
  await expect(page.getByText("Select Documentation to Load")).toBeVisible();
});

test("Can load Ed-Fi Admin API documentation", async ({ page }) => {
  await page.selectOption("#select", "Admin");
  await expect(page.getByRole('heading', { name: 'Ed-Fi Admin Api v1.0 OAS 3.0' })).toBeVisible();
});

test("Can load Tenant API documentation", async ({ page }) => {
  await page.selectOption("#select", "Tenant");
  await expect(page.getByRole('heading', { name: 'Tenant Api v1.0 OAS 3.0' })).toBeVisible();
});
*/