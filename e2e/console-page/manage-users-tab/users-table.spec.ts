
import { test, expect } from "@playwright/test"
import { routes } from "../../core/routes"

test.beforeEach(async ({ page }) => {
    await page.goto(routes.console)
    await page.waitForURL(routes.console)

    await page.waitForLoadState("networkidle")
    await expect(page.getByText("Admin Actions")).toBeVisible()

    await page.getByText("Manage Users").click()
    await page.waitForLoadState("networkidle")
})

test("Should show the users table", async ({ page }) => {
    expect(page.getByText("Users", { exact: true })).toBeVisible()
})

/*
test("Should be able to sort users by asc first name", async ({ page }) => {
    await page.getByTestId("sort-asc-firstName").click()
    await page.waitForLoadState("networkidle")

    expect(page
        .getByRole("table")
        .locator("tbody > tr > td")
        .nth(0))
    .toContainText("Antonio")
})

test("Should be able to sort users by desc first name", async ({ page }) => {
    await page.getByTestId("sort-desc-firstName").click()
    await page.waitForLoadState("networkidle")

    expect(page
        .getByRole("table")
        .locator("tbody > tr > td")
        .nth(0))
    .toContainText("testuser35@testmail.com")
})

*/