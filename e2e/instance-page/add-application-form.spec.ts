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

const openApplicationForm =  async (page: Page) => {
  await page.getByText('Texas Exchange').click()
  await page.getByRole('button', { name: 'Add Application' }).click()

  expect(page.getByRole('button', { name: 'Add Application' })).toBeVisible()
}

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()

  await page.goto(routes.instance)
  await page.waitForURL(routes.instance)
  await page.waitForLoadState('networkidle')

  await page.getByText('Vendors & Applications').click()
  await page.waitForLoadState('networkidle')

  await openApplicationForm(page)
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