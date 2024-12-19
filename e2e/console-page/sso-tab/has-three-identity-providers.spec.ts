
import {
  test, expect 
} from '@playwright/test'
import { routes } from '../../core/routes'
/*
test.beforeEach(async ({ page }) => {
  await page.goto(routes.console);
  await page.waitForURL(routes.console);

  await expect(page.getByText("Admin Actions")).toBeVisible();
  await page.getByText("SSO").click();
});

test("Has 3 identity provider options", async ({ page }) => {
  await expect(page.getByText("The Exchange", { exact: true })).toBeVisible();
  await expect(page.getByText("Microsoft")).toBeVisible();
  await expect(page.getByText("Google")).toBeVisible();
});
*/