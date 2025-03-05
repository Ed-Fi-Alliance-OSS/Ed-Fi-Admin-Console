// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

/*
import { test, expect } from "@playwright/test"
import { routes } from "../../core/routes"

test.beforeEach(async ({ page }) => {
    await page.goto(routes.console)
    await page.waitForURL(routes.console)

    await page.waitForLoadState("networkidle")
})

test("Should not be able to access the application if does not have AdminConsole.Admin role", async ({ page }) => {
    expect(page.getByText("403")).toBeVisible()
})

test("Should not be able to access the application if does not have Tenant.Admin role", async ({ page }) => {
    expect(page.getByText("403")).toBeVisible()
})

*/