import { test, expect, Page } from '@playwright/test';
import { routes } from "../../core/routes"

let page: Page;

test.describe('Home Page Tests', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(routes.home);
        await page.waitForURL(routes.home);
        await page.waitForLoadState('networkidle');
    });

    test('Home page should show Admin Actions Title', async () => {
        await expect(page.getByText("Admin Actions")).toBeVisible({ timeout: 15000 })
    });

    test('Should show every Admin Actions button as clickable', async () => {
        const manageUserAction = page.locator('a', { hasText: 'Manage Users' });
        await expect(manageUserAction).toBeVisible({ timeout: 15000 });
        await expect(manageUserAction).toBeEnabled();

        const userSyncAction = page.locator('a', { hasText: 'User Sync' });
        await expect(userSyncAction).toBeVisible();
        await expect(userSyncAction).toBeEnabled();

        const districtSettingsActions = page.locator('a', { hasText: 'District/Charter School Settings' });
        await expect(districtSettingsActions).toBeVisible();
        await expect(districtSettingsActions).toBeEnabled();

        const ssoAction = page.locator('a', { hasText: 'SSO' });
        await expect(ssoAction).toBeVisible();
        await expect(ssoAction).toBeEnabled();
    });

    test('Home page should show School Years Title', async () => {
        await expect(page.getByText("School Years")).toBeVisible({ timeout: 15000 })
    });

    //Sorting by year works


});