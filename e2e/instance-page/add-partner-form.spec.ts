// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect, Page 
} from '@playwright/test'
import { fillAddPartnerForm } from './addPartnerFormHelpers'
import { routes } from '../core/routes'

let page: Page
const partnersTabName = 'Vendors & Applications'

const openPartnerForm =  async (page: Page) => {
  await page.getByRole('button', { name: 'Add Vendor' }).click()
}

const clickAddPartnerBtn = async (page: Page) => await page.getByRole('button', { name: 'Add Vendor' }).click()
/*
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()

  await page.goto(routes.instance)
  await page.waitForURL(routes.instance)

  await page.getByText(partnersTabName).click()
  await openPartnerForm(page)
});


test("Add Vendor Form - Adds the partner", async () => {
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


test.describe("Add Vendor Form - Vendor Name", () => {
  test("Vendor Name should not be empty", async () => {
    await fillAddPartnerForm({
      page,
      nameSpacePrefixes: "prefix"
    })

    await clickAddPartnerBtn(page)
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Vendor Name should not be empty.")).toBeVisible()
  })

  test("Vendor Name should have at least 2 letters/digits", async () => {
    await fillAddPartnerForm({
        page,
        partnerName: "a",
        nameSpacePrefixes: "prefix"
    })

    await page.getByRole("button", { name: "Add Vendor" }).click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Vendor Name should have at least 2 letters.")).toBeVisible()
  })
})

test.describe("Add Vendor Form - Prefixes", () => {
    test("Namespace Prefixes should not be empty", async () => {
      await fillAddPartnerForm({
        page,
        partnerName: "partner"
      })

      await page.getByRole("button", { name: "Add Vendor" }).click()
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Namespace Prefixes should not be empty.")).toBeVisible()
    })

    test("Namespace Prefixes Name should have at least 2 letters/digits", async () => {
      await fillAddPartnerForm({
        page,
        partnerName: "partner",
        nameSpacePrefixes: "a"
      })

      await page.getByRole("button", { name: "Add Vendor" }).click()
      expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
      expect(page.getByText("Namespace Prefixes should have at least 2 letters.")).toBeVisible()
    })
}) */
