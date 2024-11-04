import { Page } from '@playwright/test'

interface FillAddPartnerFormParams {
    page: Page
    partnerName?: string
    nameSpacePrefixes?: string
}

const fillAddPartnerForm = async ({ page, partnerName, nameSpacePrefixes }: FillAddPartnerFormParams) => {
  if (partnerName)
    await page.getByLabel('Partner Name').fill(partnerName)
  if (nameSpacePrefixes)
    await page.getByLabel('Namespace Prefixes').fill(nameSpacePrefixes)
}

export {
  fillAddPartnerForm
}