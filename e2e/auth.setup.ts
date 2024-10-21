import { test as setup, expect } from '@playwright/test';

import LoginPage  from './pages/login-page'
import  { userinfo } from './user-info'


const authFile = 'playwright/.auth/user.json';

setup('Authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login(userinfo.username, userinfo.password);
  await page.context().storageState({ path: authFile })
})
