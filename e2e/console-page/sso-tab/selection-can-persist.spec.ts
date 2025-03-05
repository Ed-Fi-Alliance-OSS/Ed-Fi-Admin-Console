// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

/*
import { test, expect } from "@playwright/test";
import { routes } from "../../core/routes";

test.beforeEach(async ({ page }) => {
  await page.goto(routes.home);
  await page.waitForURL(routes.home);
  await page.goto(routes.console);
  await page.waitForURL(routes.console);
  await expect(page.getByText("Admin Actions")).toBeVisible();
  await page.getByText("SSO").click();
});

test("Select Microsft Identity Provider persists after reload", async ({ page }) => {
  await page.getByRole("checkbox").nth(1).setChecked(true, { force: true });

  await page.reload();
  await page.getByText("SSO").click();

  await expect(page.getByText("Consented")).toBeVisible();
});

test("Select Google Identity Provider persists after reload", async ({ page }) => {
  await page.getByRole("checkbox").nth(2).setChecked(true, { force: true });

  await page.reload();
  await page.getByText("SSO").click();

  await expect(page.getByText("Consented")).toBeVisible();
});
*/