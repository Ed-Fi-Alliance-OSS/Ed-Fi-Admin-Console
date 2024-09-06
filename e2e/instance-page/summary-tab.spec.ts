
import { test, expect } from "@playwright/test"
import { routes } from "../core/routes"

test.beforeEach(async ({ page }) => {
    await page.goto(routes.instance)
    await page.waitForURL(routes.instance)
    await page.waitForLoadState('networkidle')
})

test("Should show instance data if Onboarding Wizard has been finished", async ({ page }) => {
    await page.getByRole("tab", { name: "Summary" }).click()
    await expect(page.getByText("Instance Summary")).toBeVisible()

    expect(page.getByText("Description"))
    expect(page.getByText("Connection"))
    expect(page.getByText("Ed-Fi Version"))
    expect(page.getByText("Ed-Fi Status"))
})