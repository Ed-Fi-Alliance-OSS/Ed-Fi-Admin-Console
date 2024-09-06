import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const tenantId = "3cddd92b-2afd-401d-9bef-a496fa31323c"

  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://login.txedexchange.dev/')
  await page.getByText('User Name/Email').fill('antonio@dessausoftware.com')
  await page.getByRole('button', { name: 'Next' }).click()

  await page.waitForLoadState('networkidle')
  await page.locator('#ddl-tenant').selectOption(tenantId)
  await page.getByRole('link', { name: 'EdGraph' }).click()
  await page.getByPlaceholder('Password').fill('5@%gFtF$rx')
  await page.getByRole('button', { name: 'Sign in' }).click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(`https://login.txedexchange.dev/?acr_values=tenant:${tenantId}`)
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('link', { name: 'Go to launcher' })).toBeVisible()

  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})