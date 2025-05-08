// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.


import {
  test, Page, expect 
} from '@playwright/test'
import { routes } from '../core/routes'
import { fillAddApplicationForm } from './addApplicationFormHelpers'

let page: Page
const partnersTabName = 'Vendors & Applications'

const openVendorsTab =  async (page: Page) => {
  await page.getByRole('tab', { name: 'Vendors & Applications' }).click()
}

const openDefaultVendors =  async (page: Page) => {
  await page.getByRole('button', { name: 'Ed-Fi Administrative Tools' }).click()
}

const clickAddVendorBtn = async (page: Page) => await page.getByTestId('add-user-btn').click()

const openApplicationForm =  async (page: Page) => {
  await page.getByText('Texas Exchange').click()
  await page.getByRole('button', { name: 'Add Application' }).click()

  expect(page.getByRole('button', { name: 'Add Application' })).toBeVisible()
}

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(routes.home)
  await page.waitForURL(routes.home)
  await page.waitForLoadState('networkidle', { timeout: 35000 })
  await page.getByRole('link', { name: 'tenant1 ODS' }).click()
  await page.waitForLoadState('networkidle', { timeout: 35000 })
  openVendorsTab(page)
  await page.waitForLoadState('networkidle')
  openDefaultVendors(page)
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: 'Add Application' }).click()
  await page.waitForLoadState('networkidle')
})

test('Application form has fields', async () => {
  await page.getByText('Claim Sets').click()
  await page.getByText('EdOrgs', { exact: true }).click()
  await page.getByText('Application Details').click()
  await page.getByRole('heading', { name: 'Add Application' }).click()
})

test.describe('Add Application Form - Application Name', () => {
  
  test('Application Name should not be empty', async () => {
    await fillAddApplicationForm({
      page,
      vendor: '1',
      claimSet: true
    })

    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Please correct the errors')).toBeVisible()
    await expect(page.getByText('Application Name should not')).toBeVisible()
  })

  /*test("Application Name should have at least 2 letters/digits", async () => {
    await fillAddApplicationForm({
      page,
      applicationName: "a",
      vendor: '1',
      claimSet: true
    })

    await page.getByRole("button", { name: "Save" }).click()
    expect(page.getByText("Application Name should have at least 1 letters.")).toBeVisible()
  })*/
})

test.describe('Add Application Form - Vendor', () => {
  test('Application Name should not be empty', async () => {
    await fillAddApplicationForm({
      page,
      applicationName: 'application',
      vendor: null,
      claimSet: true
    })

    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Select a Vendor')).toBeVisible()
  })
})

test.describe('Add Application Form - Claim Set', () => {
  test('Application Name should not be empty', async () => {
    await fillAddApplicationForm({
      page,
      applicationName: 'application',
      vendor: '1',
      claimSet: false
    })

    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Select a Claim Set')).toBeVisible()
  })
})

/*
test.describe("Add Application Form - Application Name", () => {
    test("Application Name should not be empty", async () => {
      await fillAddApplicationForm({
        page,
        vendor: 'test',
        claimSet: true
      })

      await page.getByRole("button", { name: "Add Application" }).click()
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

      await page.getByRole("button", { name: "Add Application" }).click()
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Application Name should have at least 2 letters.")).toBeVisible()
    })
})

test.describe("Add Application Form - Vendor", () => {
    test("Application Name should not be empty", async () => {
      await fillAddApplicationForm({
        page,
        applicationName: "application",
        claimSet: true
      })

      await page.getByRole("button", { name: "Add Application" }).click()
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Select a Vendor")).toBeVisible()
    })
})

test.describe("Add Application Form - Claim Set", () => {
    test("Application Name should not be empty", async () => {
      await fillAddApplicationForm({
        page,
        applicationName: "application",
        claimSet: false
      })

      await page.getByRole("button", { name: "Add Application" }).click()
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Select a Claim Set")).toBeVisible()
    })
})
*/
/*
test("Add Application Form - Adds the Application", async () => {
  const applicationName = "testApplication"

  await fillAddApplicationForm({
    page,
    applicationName,
    vendor: 'test',
    claimSet: true
  })

  await page.getByRole("button", { name: "Add Application" }).click()
  
  await page.waitForLoadState("networkidle")
  expect(page.getByText("Success")).toBeVisible()
  expect(page.getByRole("paragraph", { name: "Vendors & Applications" })).toBeVisible()

  await page.waitForLoadState("networkidle")
  await page.getByText("Texas Exchange").click()
  expect(page.getByText(applicationName)).toBeVisible()
})

*/