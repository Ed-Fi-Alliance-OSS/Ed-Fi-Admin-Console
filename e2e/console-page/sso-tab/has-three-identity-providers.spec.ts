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
  await page.goto(routes.console);
  await page.waitForURL(routes.console);

  await expect(page.getByText("Admin Actions")).toBeVisible();
  await page.getByText("SSO").click();
});

test("Has 3 identity provider options", async ({ page }) => {
  await expect(page.getByText("The Exchange", { exact: true })).toBeVisible();
  await expect(page.getByText("Microsoft")).toBeVisible();
  await expect(page.getByText("Google")).toBeVisible();
});
*/