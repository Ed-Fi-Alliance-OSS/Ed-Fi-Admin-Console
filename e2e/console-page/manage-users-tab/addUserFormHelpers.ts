import { Page } from '@playwright/test'

interface FillAddUserFormParams {
    page: Page
    firstName?: string
    lastName?: string
    email?: string
    role?: 'admin'
}

const fillAddUserForm = async ({ page, firstName, lastName, email, role }: FillAddUserFormParams) => {
  if (firstName) {
    await page.getByLabel('First Name').fill(firstName)
  }

  if (lastName) {
    await page.getByLabel('Last Name').fill(lastName)
  }

  if (email) {
    await page.getByLabel('Email').fill(email)
  }

  if (role === 'admin') {
    await page.getByLabel('Role').selectOption('Tenant.Admin')
  }
}

export {
  fillAddUserForm
}