
import { test, expect, Page } from '@playwright/test'
import { routes } from '../../core/routes'
import { finishOnboardingWizard, resetOnBoardingWizard, updateOnboardingWizardSteps } from '../../helpers/OnboardingWizard.helpers'

const bannerWelcomeText = 'Welcome'
const bannerProgressMessage = 'Let’s finish your setup.'

/*

const restoreOnboardingWizard = async (page: Page) => {
    await resetOnBoardingWizard(page)
    await page.waitForURL(routes.home)
    await page.waitForLoadState('networkidle')

    await expect(page.getByText(bannerWelcomeText)).toBeVisible();
}

test("Should show Onboarding Wizard Banner", async ({ page }) => {
    await resetOnBoardingWizard(page)
})

test("Should show correct Onboarding Wizard progress", async ({ page }) => {
    const progressStep = 3

    await updateOnboardingWizardSteps(page, progressStep, "Completed")

    const bannerProgressStatusMessage = `You're on Step ${progressStep + 1} of 8:`
    await page.waitForURL(routes.home)
    await page.waitForLoadState('networkidle')

    await expect(page.getByText(bannerProgressMessage)).toBeVisible()
    await expect(page.getByText(bannerProgressStatusMessage)).toBeVisible()
})

test("Should not show Onboarding Wizard Banner if it has been finished", async ({ page }) => {
    await finishOnboardingWizard(page)

    await page.waitForLoadState('networkidle')

    await expect(page.getByText(bannerWelcomeText)).not.toBeVisible()
    await expect(page.getByText(bannerProgressMessage)).not.toBeVisible()
})

test("Should show instance data if Onboarding Wizard has been finished", async ({ page }) => {
    await finishOnboardingWizard(page)

    await page.waitForURL(routes.home)
    await page.waitForLoadState("networkidle")

    await expect(page.getByText("Instance Summary")).toBeVisible()
    await expect(page.getByRole("tab", { name: "Summary" })).toBeVisible()
    await expect(page.getByText("Vendors & Applications")).toBeVisible()
})

test("Should be able to start Onboarding Wizard", async ({ page }) => {
    await resetOnBoardingWizard(page)

    await page.getByTestId("start-ob-btn").click()

    await page.waitForLoadState("networkidle")
    expect(page.getByText("Welcome to the Tech Console for The Exchange!")).toBeVisible()
})

test("Step 1 should show the list of invitations", async ({ page }) => {
    await resetOnBoardingWizard(page)

    await page.getByTestId("start-ob-btn").click()

    await page.waitForLoadState("networkidle")
    expect(page.getByText("Welcome to the Tech Console for The Exchange!")).toBeVisible()
    
    await page.getByText("Step 1: Invite Technical Admin Users").click()
    await page.waitForLoadState('networkidle')

    expect(page.getByText("Step 1 of 8")).toBeVisible()
    expect(page.getByRole('table')).toBeVisible()
    expect(page.getByText("antonio@dessausoftware.com")).toBeVisible()
})

test("Should be able to visit step 2 of Onboarding Wizard", async ({ page }) => {
    await resetOnBoardingWizard(page)

    await page.getByTestId("start-ob-btn").click()

    await page.waitForLoadState("networkidle")
    expect(page.getByText("Welcome to the Tech Console for The Exchange!")).toBeVisible()
    
    await page.getByText("Step 1: Invite Technical Admin Users").click()
    await page.waitForLoadState('networkidle')

    await page.getByRole("button", { name: "Next" }).click()
    expect(page.getByText("Step 2 of 8")).toBeVisible()
})

*/