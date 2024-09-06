import { Page } from "@playwright/test"

interface FillAddSubscriptionForm {
    page: Page
    startDate?: Date
    endDate?: Date
    application?: string 
    selectApplication?: boolean
    gracePeriod?: number 
    numberOfLicenses?: number
    unlimited?: boolean 
    autoAssignLicense?: boolean 
}

interface IsSwitchCheckParams {
    page: Page, 
    testId: string 
    attributeName: string
}

const clickUnlimitedLicenseSwitch = async (page: Page) => await page.getByTestId("unlimitedLicense").click()

const isSwitchChecked = async ({ page, testId, attributeName }: IsSwitchCheckParams) => 
    await page.getByTestId(testId).getAttribute(attributeName)

const selectSwitchField = async (page: Page, testId: string, select?: boolean) => {
    const isChecked = await isSwitchChecked({ page, testId, attributeName: "data-checked" })

    if (!isChecked && select)
        return await clickUnlimitedLicenseSwitch(page)

    if (isChecked && !select)
        await clickUnlimitedLicenseSwitch(page)
}

const getStringDate = (date?: Date): string => {
    if (date) {
        const year = date.getFullYear();
        let month: string | number = date.getMonth() + 1;
        let day: string | number = date.getDate();
    
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
    
        const stringDate = month + '/' + day + '/' + year;

        return stringDate
    }

    return ""
}

const fillSubscriptionForm = async ({ page, startDate, endDate, application, selectApplication, gracePeriod, numberOfLicenses, unlimited, autoAssignLicense }: FillAddSubscriptionForm) => {
    await page.getByTestId("start-date-picker").locator("input").fill(getStringDate(startDate))
    await page.getByTestId("end-date-picker").locator("input").fill(getStringDate(endDate))

    await page.getByLabel("Grace Period").fill(gracePeriod? gracePeriod.toString() : "0")

    if (selectApplication !== false)
        await page.getByLabel("Select Application").selectOption({ label: application? application : "Select the application" })

    await page.getByLabel("No. of Licenses").fill(numberOfLicenses?  numberOfLicenses.toString() : "1")

    await selectSwitchField(page, "unlimitedLicense", unlimited)
    await selectSwitchField(page, "autoAssignLicense", autoAssignLicense)
}

export {
    fillSubscriptionForm
}