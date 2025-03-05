// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Page } from '@playwright/test'

interface FillAddApplicationFormParams {
    page: Page
    applicationName?: string
    vendor?: 'test'
    claimSet: boolean 
}

const fillAddApplicationForm = async ({ page, applicationName, vendor, claimSet }: FillAddApplicationFormParams) => {
  if (applicationName) {
    await page.getByLabel('Application Name').fill(applicationName)
  }
 
  await page.getByLabel('Vendor').selectOption(vendor? '7' : '0')
  await page.getByLabel('Claim Set').selectOption(claimSet? 'AB Connect' : 'Select Option')
}

export {
  fillAddApplicationForm
}