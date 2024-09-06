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