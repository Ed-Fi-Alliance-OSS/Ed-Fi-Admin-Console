import { CreateEdfiApplicationRequest } from "../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests"

const claimSetOptions = [
    "Select Option",
    "AB Connect",
    "Assessment Read",
    "Assessment Vendor",
    "District Hosted SIS Vendor",
    "Ed-Fi API Publisher - Reader"
]

const initialApplicationData: CreateEdfiApplicationRequest = {
    vendorId: 0,
    applicationName: '',
    claimSetName: claimSetOptions[0],
    educationOrganizationIds: []
}

export {
    claimSetOptions,
    initialApplicationData
}