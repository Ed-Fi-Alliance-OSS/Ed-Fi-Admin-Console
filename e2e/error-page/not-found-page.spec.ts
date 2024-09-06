import { test, expect } from "@playwright/test";
import { baseUrl } from "../core/routes";

test("Manage users tab can load", async ({ page }) => {
    const nonExistentRoute = `${baseUrl}/random123`

    await page.goto(nonExistentRoute);
    await page.waitForLoadState("networkidle")

    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Not Found")).toBeVisible();
});