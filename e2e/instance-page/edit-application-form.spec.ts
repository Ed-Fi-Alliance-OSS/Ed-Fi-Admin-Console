
import { test, Page, expect } from "@playwright/test"
import { routes } from '../core/routes'
import { fillAddApplicationForm } from "./addApplicationFormHelpers"

let page: Page

const openApplicationForm =  async (page: Page) => {
  await page.getByText("Texas Exchange").click()
  await page.getByRole("table").locator("tbody > tr").nth(2).getByRole("button", { name: "Edit" }).click()

  expect(page.getByText("Edit Application")).toBeVisible()
}

const clickSendBtn = async (page: Page) => await page.getByRole("button", { name: 'Save Edits' }).click()

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()

  await page.goto(routes.instance)
  await page.waitForURL(routes.instance)
  await page.waitForLoadState('networkidle')

  await page.getByText("Partners & Applications").click()
  await page.waitForLoadState("networkidle")

  await openApplicationForm(page)
})

/*
test.describe("Edit Application Form", () => {
    test("Application Name should not be empty", async () => {
      await fillAddApplicationForm({
        page,
        applicationName: "",
        vendor: 'test',
        claimSet: true
      })

      await clickSendBtn(page)
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Application Name should not be empty.")).toBeVisible()
    })

    test("Application Name should have at least 2 letters/digits", async () => {
      await fillAddApplicationForm({
        page,
        applicationName: "a",
        vendor: 'test',
        claimSet: true
      })

      await clickSendBtn(page)
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Application Name should have at least 2 letters.")).toBeVisible()
    })

    test("Should select a vendor empty", async () => {
        await fillAddApplicationForm({
          page,
          applicationName: "application",
          claimSet: true
        })

        await clickSendBtn(page)
        expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
        expect(page.getByText("Select a Vendor")).toBeVisible()
      })

    test("Should select a claim set", async () => {
      await fillAddApplicationForm({
        page,
        applicationName: "application",
        vendor: 'test',
        claimSet: false
      })

      await clickSendBtn(page)
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Select a Claim Set")).toBeVisible()
    })
})

/*
test("Edit Application Form - Edits the Application", async () => {
  const applicationName = "editedApplicationTest"

  await fillAddApplicationForm({
    page,
    applicationName,
    vendor: 'test',
    claimSet: true
  })

  await page.getByRole("button", { name: "Add Application" }).click()
  
  await page.waitForLoadState("networkidle")
  expect(page.getByText("Success")).toBeVisible()
  expect(page.getByRole("paragraph", { name: "Partners & Applications" })).toBeVisible()

  await page.waitForLoadState("networkidle")
  await page.getByText("Texas Exchange").click()
  expect(page.getByText(applicationName)).toBeVisible()
})

*/