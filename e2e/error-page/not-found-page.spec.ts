import { test, expect } from '@playwright/test'
import { baseUrl } from '../core/routes'

test('Displays 404 NotFound When Route Does Not Exist', async ({ page }) => {
  const nonExistentRoute = `${baseUrl}/random123`

  await page.goto(nonExistentRoute)
  await page.waitForLoadState('networkidle')

  const notFound404 = page.locator('text=404')
  await expect(notFound404).toBeVisible({ timeout: 30000 })

  const notFoundText = page.locator('text=Not Found')
  await expect(notFoundText).toBeVisible()
})