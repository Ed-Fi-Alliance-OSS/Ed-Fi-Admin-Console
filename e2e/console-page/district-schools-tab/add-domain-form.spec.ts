import { test, expect, Page } from '@playwright/test'
import { routes } from '../../core/routes'

const clickAddDomainBtn = async (page: Page) => await page.getByRole('button', { name: 'Add', exact: true }).click()


/*
test.beforeEach(async ({ page }) => {
    await page.goto(routes.console);
    await page.waitForURL(routes.console);
    await page.waitForLoadState("networkidle")

    await expect(page.getByText("Admin Actions")).toBeVisible();
    await page.getByText("District/Charter School Settings").click();
    await page.waitForLoadState('networkidle')

    await page.getByTestId("add-domain-btn").click()
    expect(page.getByText("Add Domain")).toBeVisible()
    await page.waitForLoadState('networkidle')
});

test("Domain name should not be empty", async ({ page }) => {
    await clickAddDomainBtn(page)

    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Domain should not be empty.")).toBeVisible()
})


test("Should add domain", async ({ page }) => {
    const domainName = "edxtestdomain.com"

    await page.getByLabel("Domain").fill(domainName)

    await clickAddDomainBtn(page)
    await page.waitForLoadState("networkidle")

    await expect(page.getByText("Admin Actions")).toBeVisible()
    await page.getByText("District/Charter School Settings").click()
    await page.waitForLoadState("networkidle")

    expect(page.getByText(domainName)).toBeVisible()
})

*/
