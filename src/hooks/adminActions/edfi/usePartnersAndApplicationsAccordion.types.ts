import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'

export interface EdfiVendorWithApplications {
    id?: number
    vendorId?: number
    company?: string 
    namespacePrefixes?: string 
    contactName?: string 
    contactEmailAddress?: string
    applications: EdfiApplication[]
}