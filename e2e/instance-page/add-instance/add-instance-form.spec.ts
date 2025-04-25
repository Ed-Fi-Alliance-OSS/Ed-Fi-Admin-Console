// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { test, expect, Page } from '@playwright/test';
import { routes } from '../../core/routes';
import { addInstanceFormHelper, MockInstanceData } from './AddInstanceFormHelper';

let page: Page;

const addInstanceTitle = 'Create Instance';
const addInstanceSaveButton = 'Create Instance';
const addInstanceSubTitle = 'Instance Details';
const addInstanceButton = 'Add Instance';

const openAddInstanceForm = async (page: Page) => {
  await page.getByRole('button', { name: addInstanceButton }).click();
};

test.describe('Add Instance Form E2E Tests', () => {
  test.beforeEach(async ({ browser }) => {
      page = await browser.newPage()
      await page.goto(routes.home)
      await page.waitForURL(routes.home)
      await page.waitForLoadState('networkidle', { timeout: 35000 })
      await openAddInstanceForm(page)
    })

  test('Add Instance page should show Create Instance Title', async () => {
    await expect(page.getByRole('heading')).toContainText(addInstanceTitle);
  })
  
  test('Add Instance page should show Create Instance SubTitle', async () => {
    await expect(page.getByRole('main')).toContainText(addInstanceSubTitle);
  })

  test('should display the Add Instance form and inputs', async () => {
    // Check if the inputs are visible
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Instance Type')).toBeVisible();
  });

  test('should successfully create a new instance', async () => {
    // Use the helper to fill out the form
    const uniqueSuffix = Date.now().toString(); // Use timestamp as a unique suffix
    const uniqueName = `Test Instance ${uniqueSuffix}`;
    const instanceData : MockInstanceData = {
      name: uniqueName,
      instanceType: 'Type A',
      odsInstanceContexts: [
        { key: 'Context1', value: 'Value1' },
      ],
      odsInstanceDerivatives: ['ReadReplica']
    };

    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator('tbody')).toContainText(uniqueName);

  });
  
  test('should successfully create a new instance with multiple contexts', async () => {
    // Use the helper to fill out the form
    const uniqueSuffix = Date.now().toString(); // Use timestamp as a unique suffix
    const uniqueName = `Test Instance ${uniqueSuffix}`;
    const instanceData : MockInstanceData = {
      name: uniqueName,
      instanceType: 'Type A',
      odsInstanceContexts: [
        { key: 'Context1', value: 'Value1' },
        { key: 'Context2', value: 'Value2' },
        { key: 'Context3', value: 'Value3' },
      ],
      odsInstanceDerivatives: ['ReadReplica']
    }
    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator('tbody')).toContainText(uniqueName);
  });

  test('should successfully create a new instance with multiple derivatives', async () => {
    // Use the helper to fill out the form
    const uniqueSuffix = Date.now().toString(); // Use timestamp as a unique suffix
    const uniqueName = `Test Instance ${uniqueSuffix}`;
    const instanceData : MockInstanceData = {
      name: uniqueName,
      instanceType: 'Type A',
      odsInstanceContexts: [
        { key: 'Context1', value: 'Value1' },
      ],
      odsInstanceDerivatives: ['ReadReplica', 'Snapshot']
    };

    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator('tbody')).toContainText(uniqueName);

  });

  test('should successfully create a new instance without context and derivates', async () => {
    // Use the helper to fill out the form
    const uniqueSuffix = Date.now().toString(); // Use timestamp as a unique suffix
    const uniqueName = `Test Instance ${uniqueSuffix}`;
    const instanceData : MockInstanceData = {
      name: uniqueName,
      instanceType: 'Type A',
      odsInstanceContexts: null,
      odsInstanceDerivatives: null,
    };
    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator('tbody')).toContainText(uniqueName);

  });

  test('should failed if instance name exists', async () => {
    // Use the helper to fill out the form
    const uniqueSuffix = Date.now().toString(); // Use timestamp as a unique suffix
    const uniqueName = `Test-Instance-${uniqueSuffix}`;
    const instanceData : MockInstanceData = {
      name: uniqueName,
      instanceType: 'Type A',
      odsInstanceContexts: [
        { key: 'Context1', value: 'Value1' },
      ],
      odsInstanceDerivatives: ['ReadReplica'],
    };
    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await page.getByText('Success').click()
    //Go to add Instance page again
    await openAddInstanceForm(page)
    // use the same payload
    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await expect(page.getByRole('main')).toContainText('Validation Errors:');
    await expect(page.getByRole('main')).toContainText('The name must be unique for the tenant.');
  });

  test('should display error messages for empty input', async () => {
    const instanceData : MockInstanceData = {
      name: '',
      instanceType: '',
      odsInstanceContexts: null,
      odsInstanceDerivatives: null,
    };
    await addInstanceFormHelper(page, instanceData);
    await page.getByRole('button', { name: 'Add Derivative' }).click();
    // Leave the form empty and click Save Changes
    await page.getByRole('button', { name: addInstanceSaveButton }).click();

    // Verify that error messages are displayed
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Instance Type is required')).toBeVisible();
    await expect(page.locator('form')).toContainText('Derivative Type is required');
  });

  test('should validate that an instance name stays within the 100-character limit', async () => {
    // Use the helper to fill out the form
    const uniqueSuffix = Date.now().toString(); // Use timestamp as a unique suffix
    const uniqueName = 'DatadrivenInteroperableStandardizedUnifiedEducationalFrameworkConnectingSystemsForActionableStudentSuccessInsights';
    const instanceData : MockInstanceData = {
      name: uniqueName,
      instanceType: 'Type A',
      odsInstanceContexts: null,
      odsInstanceDerivatives: null,
    };
    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await expect(page.getByRole('main')).toContainText('The length of \'Name\' must be 100 characters or fewer. You entered 114 characters.');

  });

  test('should ensure that an instance type does not exceed 100 characters', async () => {
    // Use the helper to fill out the form
    const uniqueSuffix = Date.now().toString(); // Use timestamp as a unique suffix
    const uniqueName = `Test Instance ${uniqueSuffix}`;
    const instanceData : MockInstanceData = {
      name: uniqueName,
      instanceType: 'EnvironmentDefinedScalableConfigurableMultiTenantDataArchitectureOptimizedForSecureInteroperableEdTechDeployments',
      odsInstanceContexts: null,
      odsInstanceDerivatives: null,
    };
    await addInstanceFormHelper(page, instanceData);

    // Click the Save Changes button
    await page.getByRole('button', { name: addInstanceSaveButton }).click();
    await expect(page.getByRole('main')).toContainText('Validation Errors:');
    await expect(page.getByRole('main')).toContainText('InstanceType:');
    await expect(page.getByRole('main')).toContainText('The length of \'Instance Type\' must be 100 characters or fewer. You entered 113 characters');
  });

  test('should navigate back to home when clicking "Back to Tech Console Home"', async () => {
    // Click the "Back to Tech Console Home" link
    await page.getByRole('link', { name: 'Back to Tech Console Home' }).click();
    // Verify that the URL is the expected home page
    await expect(page).toHaveURL(routes.home);
  });
});