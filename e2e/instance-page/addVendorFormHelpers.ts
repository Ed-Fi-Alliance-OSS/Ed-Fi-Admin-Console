// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Page } from '@playwright/test'

interface FillAddPartnerFormParams {
    page: Page
    vendorName?: string
    nameSpacePrefixes?: string[] | null
}

const fillAddVendorPartnerForm = async ({ page, vendorName, nameSpacePrefixes }: FillAddPartnerFormParams) => {
  if (vendorName) {
    await page.getByLabel('Vendor Name').fill(vendorName)
  }

  if (nameSpacePrefixes && nameSpacePrefixes.length > 0) {
    for (const prefix of nameSpacePrefixes) {
      await page.getByLabel('Add Namespace Prefixes').fill(prefix)
      await page.getByText(prefix, { exact: true }).click()
    }
  }
}

export {
  fillAddVendorPartnerForm
}