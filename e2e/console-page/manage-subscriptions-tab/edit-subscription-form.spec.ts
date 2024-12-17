
import {
  test, expect, Page 
} from '@playwright/test'
import { routes } from '../../core/routes'
import { fillSubscriptionForm } from './addSubscriptionFormHelpers'

const clickUpdateBtn = async (page: Page) => await page.getByRole('button', { name: 'Update' }).click()
const openEditSubscriptionForm = async (page: Page) => await page.getByText('Test App').click()

const closeEditSubscriptionForm = async (page: Page) => {
  await page.getByRole('button', { name: 'cancel' }).click()
  expect(page.getByText('Edit Subscription')).toBeVisible()

  await page.waitForLoadState('networkidle')
}

let page: Page
const applicationName = 'Test App'
/*
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()

    await page.goto(routes.console)
    await page.waitForURL(routes.console)
    await page.waitForLoadState('networkidle')

    await expect(page.getByText("Admin Actions")).toBeVisible()
    await page.getByText("Manage Subscriptions").click()

    await page.waitForLoadState("networkidle")
})



test.describe("Edit Subscription Form - Subscription Duration", () => {
  test.beforeEach(async () => await openEditSubscriptionForm(page))
  test.afterEach(async () => await closeEditSubscriptionForm(page)) 

  test("Should select start date", async () => {
    await fillSubscriptionForm({
      page,
      unlimited: false, 
      selectApplication: false,
      autoAssignLicense: false,
      numberOfLicenses: 1,
      gracePeriod: 0
    })

    await clickUpdateBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Start Date should not be empty.")).toBeVisible()
  })

  test("Should select end date", async () => {
    await fillSubscriptionForm({
      page,
      startDate: new Date(),
      unlimited: false, 
      selectApplication: false,
      autoAssignLicense: false,
      numberOfLicenses: 1,
      gracePeriod: 0
    })

    await clickUpdateBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("End Date should not be empty.")).toBeVisible()
  })

  test("Duration should be 30 days or greater.", async () => {
    await fillSubscriptionForm({
      page,
      startDate: new Date(),
      endDate: new Date(),
      unlimited: false, 
      selectApplication: false,
      autoAssignLicense: false,
      numberOfLicenses: 1,
      gracePeriod: 0
    })

    await clickUpdateBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Subscription Duration should be 30 days or greater.")).toBeVisible()
  })
})

test.describe("Edit Subscription Form - Grace Period", () => {
  test.beforeEach(async () => await openEditSubscriptionForm(page))
  test.afterEach(async () => await closeEditSubscriptionForm(page))

  test("Should be more than 0", async () => {
    await fillSubscriptionForm({
      page,
      selectApplication: false,
      gracePeriod: -1
    })

    await clickUpdateBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Grace Period should be between 0 and 365")).toBeVisible()
  })

  test("Should be less than 0", async () => {
    await fillSubscriptionForm({
      page,
      selectApplication: false,
      gracePeriod: 1000
    })

    await clickUpdateBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Grace Period should be between 0 and 365")).toBeVisible()
  })
})

test.describe("Edit Subscription Form - Number of Licenses", () => {
  test.beforeEach(async () => await openEditSubscriptionForm(page))
  test.afterEach(async () => await closeEditSubscriptionForm(page))

  test("Should be between 0 and 100", async () => {
    await fillSubscriptionForm({
      page,
      selectApplication: false,
      numberOfLicenses: 1000,
      gracePeriod: 0
    })

    await clickUpdateBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Number Of Licenses should be between 0 and 100")).toBeVisible()
  })
})

test("Should edit subscription", async () => {
  await openEditSubscriptionForm(page)

  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 30)

  await fillSubscriptionForm({
    page, 
    startDate,
    endDate,
    application: applicationName,
    selectApplication: false,
    numberOfLicenses: 1,
    gracePeriod: 0,
  })

  await clickUpdateBtn(page)
  await page.waitForLoadState("networkidle")

  expect(page.getByText("Success")).toBeVisible()
  expect(page.getByRole("paragraph", { name: "Subscriptions" })).toBeVisible()

  await page.waitForLoadState("networkidle")
})

*/