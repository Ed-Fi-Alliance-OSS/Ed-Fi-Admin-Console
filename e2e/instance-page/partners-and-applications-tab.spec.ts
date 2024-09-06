
import { test, expect } from "@playwright/test"
import { routes } from "../core/routes"

test.beforeEach(async ({ page }) => {
    await page.goto(routes.instance)
    await page.waitForURL(routes.instance)

    await page.getByText("Partners & Applications").click()
});

test("Shows the list of applications table", async ({  page }) => {
    expect(page.url()).toBe(routes.instance)

    await page.waitForLoadState("networkidle")

    await expect(page.getByText("0 items to show")).not.toBeVisible()
    await expect(page.getByText("Texas Exchange")).toBeVisible()
})