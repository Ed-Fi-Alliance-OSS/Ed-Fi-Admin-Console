
import { test, expect } from "@playwright/test";
import { routes } from "../../core/routes";

/*
test.beforeEach(async ({ page }) => {
  await page.goto(routes.console);
  await page.waitForURL(routes.console);

  await page.waitForLoadState("networkidle")
  await expect(page.getByText("Admin Actions")).toBeVisible();

  await page.getByText("Manage Users").click();
});

test("Manage users tab can load", async ({ page }) => {
  await page.waitForLoadState("networkidle")

  expect(page.url()).toBe(routes.console)
  await expect(page.getByRole("button", { name: "Add User" })).toBeVisible();
});

test("Should Show the list of users", async ({  page }) => {
  await page.waitForLoadState('networkidle')
  expect(page.url()).toBe(routes.console)

  await expect(page.getByText("0 items to show")).not.toBeVisible()
  expect(await page.locator('table > tbody > tr').count()).not.toBe(0)
})

test.describe("Should be able to filter users by properties", () => {
  test("Should filter by firstName", async ({ page }) => {
    await page.waitForLoadState("networkidle")
    expect(page.url()).toBe(routes.console)
  })
}) */