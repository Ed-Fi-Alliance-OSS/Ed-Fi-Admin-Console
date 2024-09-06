export interface CreateEdfiVendorRequest {
    company: string 
    namespacePrefixes?: string 
    contactName: string 
    contactEmailAddress: string 
}

export interface DeleteEdfiVendorRequest {
    vendorId: string
}