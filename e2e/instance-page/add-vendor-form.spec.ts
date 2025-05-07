// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect, Page 
} from '@playwright/test'
import { fillAddVendorPartnerForm } from './addVendorFormHelpers'
import { routes } from '../core/routes'
import { addInstanceFormHelper } from './AddInstanceFormHelper'

const defaultInstanceName = 'tenant1 ODS'
const addInstanceButton = 'Add Instance'
const addInstanceSaveButton = 'Create Instance'
const addVendorButton = 'Add Vendor'
const uniqueSuffix = Date.now().toString() // Use timestamp as a unique suffix
const uniqueInstanceName = `Instance ${uniqueSuffix}`
const uniqueVendorSuffix = Date.now().toString() // Use timestamp as a unique suffix
const uniqueVendorName = `Vendor${uniqueVendorSuffix}`

const instanceData = {
  name: uniqueInstanceName,
  instanceType: 'Type A',
  odsInstanceContexts: [
    {
      key: 'Context1',
      value: 'Value1' 
    }, 
  ],
  odsInstanceDerivatives: [ 'ReadReplica' ],
}

const openAddInstanceForm = async (page: Page) => {
  await page.getByRole('button', { name: addInstanceButton }).click()
}

let page: Page
const partnersTabName = 'Vendors & Applications'

const openVendorForm =  async (page: Page) => {
  await page.getByRole('button', { name: addVendorButton }).click()
}

const openVendorsTab =  async (page: Page) => {
  await page.getByRole('tab', { name: 'Vendors & Applications' }).click()
}

const clickAddVendorBtn = async (page: Page) => await page.getByTestId('add-user-btn').click()

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(routes.home)
  await page.waitForURL(routes.home)
  await page.waitForLoadState('networkidle', { timeout: 35000 })
  await openAddInstanceForm(page)
  // Create a new instance
  await addInstanceFormHelper(page, instanceData)
  await page.getByRole('button', { name: addInstanceSaveButton }).click()
  await page.waitForLoadState('networkidle')
})

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage()
  await page.goto(routes.home)
  await page.waitForURL(routes.home)
  await page.waitForLoadState('networkidle', { timeout: 35000 })
  // Open the instance page
  await page.getByRole('link', {
    name: uniqueInstanceName,
    exact: true 
  }).click()

  await page.waitForLoadState('networkidle')
})

test.afterEach(async () => {
  await page.close()
})

test.afterAll(async ({ browser }) => {
  await browser.close()
})


test('Add Vendor Form - Adds the vendor', async () => {
  await expect(page.getByRole('tablist')).toContainText('Vendors & Applications')
  openVendorsTab(page)
  await page.waitForLoadState('networkidle')
  await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
  // Open the Add Vendor form
  await openVendorForm(page)
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading')).toContainText('Add Vendor')
  await fillAddVendorPartnerForm({
    page,
    vendorName: uniqueVendorName,
    nameSpacePrefixes: [ `http://vendor${uniqueVendorSuffix}.org` ]
  })

  // Click the Add Vendor button
  await clickAddVendorBtn(page)
  await page.waitForLoadState('networkidle')
  await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
  await expect(page.getByRole('status')).toContainText('Added Vendor')
})

test.describe('Add Vendor Form - Vendor Name', () => {
  test('Vendor Name should not be empty', async () => {
    const uniqueVendorSuffix = Date.now().toString() // Use timestamp as a unique suffix
    openVendorsTab(page)
    await page.waitForLoadState('networkidle')
    // Open the Add Vendor form
    await openVendorForm(page)
    await page.waitForLoadState('networkidle')
    await fillAddVendorPartnerForm({
      page,
      vendorName: '',
      nameSpacePrefixes: [ `http://vendor${uniqueVendorSuffix}.org` ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    await expect(page.locator('form')).toContainText('Vendor Name should not be empty.')
  })

  test('Vendor Name should have at least 2 letters/digits', async () => {
    const uniqueVendorSuffix = Date.now().toString() // Use timestamp as a unique suffix
    openVendorsTab(page)
    await page.waitForLoadState('networkidle')
    // Open the Add Vendor form
    await openVendorForm(page)
    await page.waitForLoadState('networkidle')
    await fillAddVendorPartnerForm({
      page,
      vendorName: 'a',
      nameSpacePrefixes: [ `http://vendor${uniqueVendorSuffix}.org` ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('status')).toContainText('ErrorVendor Name should have at least 2 letters.')
  })

  test('Vendor Name should have at least only letters/digits', async () => {
    const uniqueVendorSuffix = Date.now().toString() // Use timestamp as a unique suffix
    openVendorsTab(page)
    await page.waitForLoadState('networkidle')
    // Open the Add Vendor form
    await openVendorForm(page)
    await page.waitForLoadState('networkidle')
    await fillAddVendorPartnerForm({
      page,
      vendorName: 'vendor-1234',
      nameSpacePrefixes: [ `http://vendor${uniqueVendorSuffix}.org` ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    await expect(page.locator('form')).toContainText('Field must only contain alpha-numeric characters and/or spaces')
  })
})

test.describe('Add Vendor Form - Prefixes', () => {
  test('Namespace Prefixes should not be empty', async () => {
    openVendorsTab(page)
    await page.waitForLoadState('networkidle')
    // Open the Add Vendor form
    await openVendorForm(page)
    await page.waitForLoadState('networkidle')
    await fillAddVendorPartnerForm({
      page,
      vendorName: uniqueVendorName,
      nameSpacePrefixes: null
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('status')).toContainText('Namespace Prefixes is required.')
  })
  
  test('Namespace Prefixes Name should fail with invalid url', async () => {
    openVendorsTab(page)
    await page.waitForLoadState('networkidle')
    // Open the Add Vendor form
    await openVendorForm(page)
    await page.waitForLoadState('networkidle')
    await fillAddVendorPartnerForm({
      page,
      vendorName: uniqueVendorName,
      nameSpacePrefixes: [ 'prefix' ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    expect(page.getByText('Please correct the errors below and resubmit the form.')).toBeVisible()
    await expect(page.getByRole('status')).toContainText('Invalid url')
  })
})

test.describe('Add Vendor Form - Edit Vendor Name', () => {
  const uniqueVendorSuffix = Date.now().toString() // Use timestamp as a unique suffix
  const uniqueVendorToEdit = `Vendor${uniqueVendorSuffix}`

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(routes.home)
    await page.waitForURL(routes.home)
    await page.waitForLoadState('networkidle', { timeout: 35000 })
    // Open the instance page
    await page.getByRole('link', {
      name: defaultInstanceName,
      exact: true 
    }).click()

    await page.waitForLoadState('networkidle')
    openVendorsTab(page)
    await page.waitForLoadState('networkidle')
    // Open the Add Vendor form
    await openVendorForm(page)
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading')).toContainText('Add Vendor')
    await fillAddVendorPartnerForm({
      page,
      vendorName: uniqueVendorToEdit,
      nameSpacePrefixes: [ `http://vendor-to-edit-${uniqueVendorSuffix}.org` ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
  })

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto(routes.home)
    await page.waitForURL(routes.home)
    await page.waitForLoadState('networkidle', { timeout: 35000 })
    // Open the instance page
    await page.getByRole('link', {
      name: defaultInstanceName,
      exact: true 
    }).click()

    await page.waitForLoadState('networkidle')
    openVendorsTab(page)
    await page.waitForLoadState('networkidle')
    await page.getByLabel('Page Index').click()
    await page.getByLabel('Page Index').fill('99')
    await page.waitForLoadState('networkidle')
  })

  // TODO: Vendors Form has a bug, if you don't change the vendor name, it will show an error (AC-233). 
  test.skip('Edit Vendor without change should be successful', async () => {
    await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
    const selectedRow = await page.getByRole('button', { name: uniqueVendorToEdit }).locator('..')
    await page.waitForLoadState('networkidle')
    await selectedRow.getByRole('button', { name: 'Edit' }).click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading')).toContainText('Edit Vendor')
    await fillAddVendorPartnerForm({
      page,
      vendorName: uniqueVendorToEdit,
      nameSpacePrefixes: [ `http://vendor${uniqueVendorSuffix}.org` ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('text=SuccessUpdated Vendor')
    await expect(page.getByText('SuccessUpdated Vendor')).toBeVisible()
    await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
  })

  // TODO: Vendors Form has a bug, if you don't change the vendor name, it will show an error(AC-233)
  test.skip('Edit Vendor change namespace prefixes should be successful', async () => {
    await page.waitForLoadState('networkidle')
    await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
    //await page.waitForSelector(`button:has-text("${uniqueVendorToEdit}")`);
    const selectedRow = await page.getByRole('button', { name: uniqueVendorToEdit }).locator('..') 
    await page.waitForLoadState('networkidle')
    await selectedRow.getByRole('button', { name: 'Edit' }).click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading')).toContainText('Edit Vendor')
    await fillAddVendorPartnerForm({
      page,
      vendorName: uniqueVendorToEdit,
      nameSpacePrefixes: [ `http://vendor-edited-${uniqueVendorSuffix}.org` ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('SuccessUpdated Vendor')).toBeVisible()
    await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
  })
  
  test('Edit Vendor change vendor name should be successful', async () => {
    await page.waitForLoadState('networkidle')
    await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
    await page.waitForSelector(`button:has-text("${uniqueVendorToEdit}")`)
    const selectedRow = await page.getByRole('button', { name: uniqueVendorToEdit }).locator('..') 
    await page.waitForLoadState('networkidle')
    await selectedRow.getByRole('button', { name: 'Edit' }).click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading')).toContainText('Edit Vendor')
    await fillAddVendorPartnerForm({
      page,
      vendorName: `EditedVendor${uniqueVendorSuffix}`,
      nameSpacePrefixes: [ `http://vendor-edited-${uniqueVendorSuffix}.org` ]
    })

    // Click the Add Vendor button
    await clickAddVendorBtn(page)
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('SuccessUpdated Vendor')).toBeVisible()
    await expect(page.getByLabel('Vendors & Applications').getByRole('heading')).toContainText('Vendors & Applications')
  })
})