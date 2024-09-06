import { test, expect, Page } from "@playwright/test"
import { fillAddPartnerForm } from "./addPartnerFormHelpers"
import { routes } from '../core/routes'

let page: Page

const partnersTabName = "Partners & Applications"

const openPartnerForm =  async (page: Page) => {
    await page.getByRole('button', { name: "Add Partner" }).click()
}

const clickAddPartnerBtn = async (page: Page) => await page.getByRole("button", { name: "Add Partner" }).click()

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()

  await page.goto(routes.instance)
  await page.waitForURL(routes.instance)

  await page.getByText(partnersTabName).click()
  await openPartnerForm(page)
});

/*
test("Add Partner Form - Adds the partner", async () => {
  const testPartnerName = "eetestpartner"

  await fillAddPartnerForm({
    page,
    partnerName: testPartnerName,
    nameSpacePrefixes: "test"
  })

  await clickAddPartnerBtn(page)
  await page.waitForLoadState("networkidle")
  expect(page.getByText("success")).toBeVisible()
  
  expect(page.getByText(partnersTabName)).toBeVisible()
  await page.waitForLoadState("networkidle")
  expect(page.getByRole("paragraph", { name: partnersTabName })).toBeVisible()
  expect(page.getByText(testPartnerName))
})
*/

test.describe("Add Partner Form - Partner Name", () => {
  test("Partner Name should not be empty", async () => {
    await fillAddPartnerForm({
      page,
      nameSpacePrefixes: "prefix"
    })

    await clickAddPartnerBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Partner Name should not be empty.")).toBeVisible()
  })

  test("Partner Name should have at least 2 letters/digits", async () => {
    await fillAddPartnerForm({
        page,
        partnerName: "a",
        nameSpacePrefixes: "prefix"
    })

    await page.getByRole("button", { name: "Add Partner" }).click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Partner Name should have at least 2 letters.")).toBeVisible()
  })
})

test.describe("Add Partner Form - Prefixes", () => {
    test("Namespace Prefixes should not be empty", async () => {
      await fillAddPartnerForm({
        page,
        partnerName: "partner"
      })

      await page.getByRole("button", { name: "Add Partner" }).click()
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Namespace Prefixes should not be empty.")).toBeVisible()
    })

    test("Namespace Prefixes Name should have at least 2 letters/digits", async () => {
      await fillAddPartnerForm({
        page,
        partnerName: "partner",
        nameSpacePrefixes: "a"
      })

      await page.getByRole("button", { name: "Add Partner" }).click()
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Namespace Prefixes should have at least 2 letters.")).toBeVisible()
    })
})
