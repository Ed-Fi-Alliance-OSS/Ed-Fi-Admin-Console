
import { test, expect } from "@playwright/test"
import { routes } from "../core/routes"

test.beforeEach(async ({ page }) => {
    await page.goto(routes.instance)
    await page.waitForURL(routes.instance)

    await page.getByText("Data Management (Advanced)").click()
});

test("Shows the list of descriptors", async ({  page }) => {
    await page.getByLabel("Select Data to Load").selectOption("Descriptors")
    await expect(page.getByRole("table")).toBeVisible()

    await page.waitForLoadState("networkidle")
    expect(page.url()).toBe(routes.instance)

    await expect(page.getByText("0 items to show")).not.toBeVisible()
    expect(await page.locator('table > tbody > tr').count()).not.toBe(0)
})

test("Shows the list of Education Organizations", async ({  page }) => {
    await page.getByLabel("Select Data to Load").selectOption("Education Organizations")
    await expect(page.getByRole("table")).toBeVisible()

    await page.waitForLoadState("networkidle")
    expect(page.url()).toBe(routes.instance)

    await expect(page.getByText("0 items to show")).not.toBeVisible()
    expect(await page.locator('table > tbody > tr').count()).not.toBe(0)
})

test("Shows the list of Permissions", async ({  page }) => {
    await page.getByLabel("Select Data to Load").selectOption("Permissions")
    await expect(page.getByRole("table")).toBeVisible()

    await page.waitForLoadState("networkidle")
    expect(page.url()).toBe(routes.instance)

    await expect(page.getByText("0 items to show")).not.toBeVisible()
    expect(await page.locator('table > tbody > tr').count()).not.toBe(0)
})
