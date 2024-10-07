import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const tenantId = "3cddd92b-2afd-401d-9bef-a496fa31323c"

  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:28080/realms/myrealm/protocol/openid-connect/auth?client_id=ac')
  await page.getByLabel('username').fill('myuser')
  // await page.getByRole('button', { name: 'Next' }).click()

  await page.waitForLoadState('networkidle')
  // await page.locator('#ddl-tenant').selectOption(tenantId)
  // await page.getByRole('link', { name: 'EdGraph' }).click()
  await page.getByLabel('password').first().fill('admin')
  await page.getByRole('button', { name: 'Sign In' }).click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // await page.waitForURL(`https://login.txedexchange.dev/?acr_values=tenant:${tenantId}`)
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('link', { name: 'Go to launcher' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Show Quick Launcher Menu' })).toBeVisible()

  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})

