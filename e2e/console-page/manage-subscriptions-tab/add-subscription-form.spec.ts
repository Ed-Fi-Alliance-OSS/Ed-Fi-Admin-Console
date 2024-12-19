
import {
  test, expect, Page 
} from '@playwright/test'
import { routes } from '../../core/routes'
import { fillSubscriptionForm } from './addSubscriptionFormHelpers'

let page: Page
const applicationName = 'test'

const openAddSubscriptionForm = async (page: Page) =>  {
  await page.getByRole('button', { name: 'Add Subscription' }).click()

  await page.waitForLoadState('networkidle')
}

const closeAddSubscriptionForm = async (page: Page) => await page.getByRole('button', { name: 'cancel' }).click()
const clickAddSubscriptionBtn = async (page: Page) => await page.getByRole('button', { name: 'Add' }).click()
/*
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  // browser.contexts()[0].storageState()

  await page.goto(routes.console)
  await page.waitForURL(routes.console)
  await page.waitForLoadState('networkidle')

  await expect(page.getByText("Admin Actions")).toBeVisible()
  await page.getByText("Manage Subscriptions").click()

  await page.waitForLoadState("networkidle")
})




test.describe("Add Subscription Form - Subscription Duration", () => {
  test.beforeEach(async () => await openAddSubscriptionForm(page))
  test.afterEach(async () => await closeAddSubscriptionForm(page)) 

  test("Should select start date", async () => {
    await fillSubscriptionForm({
      page,
      unlimited: false, 
      autoAssignLicense: false,
      numberOfLicenses: 1,
      gracePeriod: 0
    })

    await clickAddSubscriptionBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Start Date should not be empty.")).toBeVisible()
  })

  test("Should select end date", async () => {
    await fillSubscriptionForm({
      page,
      startDate: new Date(),
      unlimited: false, 
      autoAssignLicense: false,
      numberOfLicenses: 1,
      gracePeriod: 0
    })

    await clickAddSubscriptionBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("End Date should not be empty.")).toBeVisible()
  })

  test("Duration should be 30 days or greater.", async () => {
    await fillSubscriptionForm({
      page,
      startDate: new Date(),
      endDate: new Date(),
      unlimited: false, 
      autoAssignLicense: false,
      numberOfLicenses: 1,
      gracePeriod: 0
    })

    await clickAddSubscriptionBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Subscription Duration should be 30 days or greater.")).toBeVisible()
  })
})

test.describe("Add Subscription Form - Select Application", () => {
  test.beforeEach(async () => await openAddSubscriptionForm(page))
  test.afterEach(async () => await closeAddSubscriptionForm(page))

  test("Should select application", async () => {
    await fillSubscriptionForm({
      page,
    })

    await clickAddSubscriptionBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByRole("paragraph", { name: "Select Application" })).toBeVisible()
  })
})

test.describe("Add Subscription Form - Grace Period", () => {
  test.beforeEach(async () => await openAddSubscriptionForm(page))
  test.afterEach(async () => await closeAddSubscriptionForm(page))

  test("Should be more than 0", async () => {
    await clickAddSubscriptionBtn(page)

    await fillSubscriptionForm({
      page,
      gracePeriod: -1
    })

    await clickAddSubscriptionBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Grace Period should be between 0 and 365")).toBeVisible()
  })

  test("Should be less than 0", async () => {
    await clickAddSubscriptionBtn(page)

    await fillSubscriptionForm({
      page,
      gracePeriod: 1000
    })

    await clickAddSubscriptionBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Grace Period should be between 0 and 365")).toBeVisible()
  })
})

test.describe("Add Subscription Form - Number of Licenses", () => {
  test.beforeEach(async () => await openAddSubscriptionForm(page))
  test.afterEach(async () => await closeAddSubscriptionForm(page))

  test("Should be between 0 and 100", async () => {
    await clickAddSubscriptionBtn(page)

    await fillSubscriptionForm({
      page,
      application: applicationName,
      numberOfLicenses: 1000,
      gracePeriod: 0
    })

    await clickAddSubscriptionBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Number Of Licenses should be between 0 and 100")).toBeVisible()
  })
})

/*
test("Should add subscription", async () => {
  await openAddSubscriptionForm(page)

  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 30)

  await fillSubscriptionForm({
    page, 
    startDate,
    endDate,
    application: applicationName,
    numberOfLicenses: 1,
    gracePeriod: 0,
  })

  await clickAddSubscriptionBtn(page)
  await page.waitForLoadState("networkidle")

  expect(page.getByText("Success")).toBeVisible()
  expect(page.getByRole("paragraph", { name: "Subscriptions" })).toBeVisible()

  await page.waitForLoadState("networkidle")
  expect(page.getByText(applicationName, { exact: true })).toBeVisible()
})
*/