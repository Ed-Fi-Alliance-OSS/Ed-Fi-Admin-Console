// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Page } from '@playwright/test'
import { routes } from '../core/routes'

export type DebugModeStepStatus = 'Pending' | 'Completed' | 'InProgress'

export const goToDebugMode = async (page: Page) => {
  await page.goto(routes.debug)
  await page.waitForURL(routes.debug)

  await page.waitForLoadState('networkidle')
}

export const resetOnBoardingWizard = async (page: Page) => {
  const onboardingWizardBtnText = 'Reset Onboarding Wizard'

  await goToDebugMode(page)

  await page.getByText(onboardingWizardBtnText).click()
}

export const updateOnboardingWizardSteps = async (page: Page, finalStep: number, status: DebugModeStepStatus) => {
  await goToDebugMode(page)

  const stepLabel = 'Select Step'
  const stepStatus = 'Select Status'
  const btnText = finalStep === 1? `Update Step ${finalStep}` : `Update Steps from 1 to ${finalStep} as ${status}`

  await page.getByLabel(stepLabel).selectOption(`${finalStep}`)
  await page.getByLabel(stepStatus).selectOption(`${status}`)

  await page.getByText(btnText).click()
}

export const finishOnboardingWizard = async (page: Page) => await updateOnboardingWizardSteps(page, 8, 'Completed')