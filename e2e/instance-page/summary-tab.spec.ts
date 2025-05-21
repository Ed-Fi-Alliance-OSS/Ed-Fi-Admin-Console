// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  test, expect
} from '@playwright/test'
import { routes } from '../core/routes'
import { addInstanceFormHelper } from './addInstanceFormHelper'

const uniqueSuffix = Date.now().toString()
const uniqueInstanceName = `TestInstance ${uniqueSuffix}`

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

const openAddInstanceForm = async (page) => {
  await page.getByRole('button', { name: 'Add Instance' }).click()
}

const createNewInstance = async (page) => {
  await page.goto(routes.home)
  await page.waitForLoadState('networkidle', { timeout: 35000 })
  await openAddInstanceForm(page)
  await addInstanceFormHelper(page, instanceData)
  await page.getByRole('button', { name: 'Create Instance' }).click()
  await page.waitForLoadState('networkidle')
  await page.getByRole('link', {
    name: uniqueInstanceName,
    exact: true
  }).click()

  await page.waitForLoadState('networkidle')
}

test('Should show Summary Tab', async ({ page }) => {
  await createNewInstance(page)

  await expect(page.getByRole('tablist')).toContainText('Summary')
  await page.getByRole('tab', { name: 'Summary' }).click()

  await expect(page.getByText('Data Preview')).toBeVisible()
  await expect(page.getByLabel('Refresh', { exact: true })).toBeVisible()
  await expect(page.getByText('Ed-Fi Base URL')).toBeVisible({ timeout: 15000 })
  await expect(page.getByText('Ed-Fi Version')).toBeVisible()
  await expect(page.getByText('Instance Type')).toBeVisible()
  await expect(page.getByText('Instance Management Worker Status')).toBeVisible()
})

test.skip('Should show instance data if Onboarding Wizard has been finished', async ({ page }) => {
  await page.goto(routes.home)

  await page.getByRole('link', {
    name: uniqueInstanceName,
    exact: true
  }).click()

  await page.waitForLoadState('networkidle')

  await page.getByRole('tab', { name: 'Summary' }).click()

  await expect(page.getByText('Ed-Fi Base URL')).toBeVisible({ timeout: 15000 })
  await expect(page.getByText('Ed-Fi Version')).toBeVisible()
  await expect(page.getByText('TSDS Version')).toBeVisible()
  await expect(page.getByText('Ed-Fi Status')).toBeVisible()
  await expect(page.getByText('Hosting')).toBeVisible()
})
