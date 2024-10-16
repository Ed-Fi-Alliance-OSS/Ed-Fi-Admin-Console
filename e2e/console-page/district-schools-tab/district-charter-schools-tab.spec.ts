import { test, expect } from "@playwright/test";
import { routes } from "../../core/routes";

/*
test.beforeEach(async ({ page }) => {
    await page.goto(routes.console);
    await page.waitForURL(routes.console);

    await expect(page.getByText("Admin Actions")).toBeVisible();
    await page.getByText("District/Charter School Settings").click();
    await page.waitForLoadState('networkidle')
});

test("Shows the list of District Charter/Schools", async ({  page }) => {
    await expect(page.getByTestId("district-table")).toBeVisible()

    await page.waitForLoadState('networkidle')
    expect(page.url()).toBe(routes.console)

    await expect(page.getByText("0 items to show")).not.toBeVisible()
    expect(await page.locator('table > tbody > tr').count()).not.toBe(0)
})
    */
