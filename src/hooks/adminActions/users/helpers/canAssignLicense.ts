export const canAssignLicense = (assignedLicenses: number, totalLicenses: number) => {
    console.log('can assign licenses', assignedLicenses, totalLicenses)
    if (assignedLicenses < totalLicenses)   
        return true

    if (totalLicenses === -1)
        return true

    return false
}