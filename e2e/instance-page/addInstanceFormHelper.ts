// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Page } from '@playwright/test'

/**
 * Helper function to fill out the Add Instance form.
 * @param page - The Playwright page object.
 * @param instanceData - The data to populate the form fields.
 */
export type MockInstanceData = {
  name: string;
  instanceType: string;
  odsInstanceContexts: { key: string; value: string }[] | null;
  odsInstanceDerivatives: string[] | null;
};

export const addInstanceFormHelper = async (
  page: Page,
  instanceData: MockInstanceData
) => {
  if (instanceData.name) {
    await page.getByLabel('Name').fill(instanceData.name)
  }

  if (instanceData.instanceType) {
    await page.getByLabel('Instance Type').fill(instanceData.instanceType)
  }

  if (instanceData.odsInstanceContexts) {
    for (let i = 0; i < instanceData.odsInstanceContexts.length; i++) {
      const context = instanceData.odsInstanceContexts[i]
      await page.getByRole('button', { name: 'Add Context' }).click()
      await page.getByPlaceholder('Context Key').nth(i).fill(context.key)
      await page.getByPlaceholder('Context Value').nth(i).fill(context.value)
    }
  }

  if (instanceData.odsInstanceDerivatives) {
    for (let i = 0; i < instanceData.odsInstanceDerivatives.length; i++) {
      const derivative = instanceData.odsInstanceDerivatives[i]
      await page.getByRole('button', { name: 'Add Derivative' }).click()
      await page.locator(`#derivative-${i}`).selectOption(derivative)
    }
  }
}