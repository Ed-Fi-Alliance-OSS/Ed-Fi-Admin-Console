
import { test, expect, Page } from '@playwright/test'
import { routes } from '../../core/routes'

const openManageSubscriptionsForm = async (page: Page) => {
  await page.getByTestId('manage-Test App-btn').click()

  expect(page.waitForLoadState('networkidle'))
  expect(page.getByText('Manage Subscriptions')).toBeVisible()
}
/*
test.beforeEach(async ({ page }) => {
    await page.goto(routes.console)
    await page.waitForURL(routes.console)

    await expect(page.getByText("Admin Actions")).toBeVisible()
    await page.getByText("Manage Subscriptions").click()
})



test("Shows the list of subscriptions", async ({  page }) => {
    await expect(page.getByRole("table")).toBeVisible()

    await page.waitForLoadState('networkidle')
    expect(page.url()).toBe(routes.console)

    await expect(page.getByText("0 items to show")).not.toBeVisible()
    expect(await page.locator('table > tbody > tr').count()).not.toBe(0)
})

test("Filters the list", async ({ page }) => {
    await openManageSubscriptionsForm(page)

    const userName = "test user 1234"
    await page.getByLabel("Search for User").fill(userName)

    expect(await page.getByTestId("subscribers-list").locator("div").count()).toBe(1)
})

test("Manages the user subscription", async ({ page }) => {
    await openManageSubscriptionsForm(page)

    const userName = "test user 1234"
    await page.getByLabel("Search for User").fill(userName)

    const userItem = page.getByTestId("subscribers-list").locator("div")

    expect(userItem.count()).toBe(1)
    await userItem.locator("label").click()

    expect(page.getByTestId("subscribers-list").locator("div > label").getAttribute("data-checked")).toBeTruthy()
    await userItem.locator('label').click()
})

*/