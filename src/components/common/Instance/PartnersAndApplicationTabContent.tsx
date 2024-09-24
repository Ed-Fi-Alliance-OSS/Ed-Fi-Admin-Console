import { Flex } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { DeletingState } from "../../../core/deletingState.types"
import { EdfiApplication } from "../../../core/Edfi/EdfiApplications"
import usePartnersAndApplicationsAccordion from "../../../hooks/adminActions/edfi/usePartnersAndApplicationsAccordion"
import useEDXToast from "../../../hooks/common/useEDXToast"
import useEdfiApplicationsService from "../../../services/AdminActions/Edfi/Applications/EdfiApplicationsService"
import useEdfiVendorsService from "../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService"
import ConsoleModal from "../ConsoleModal"
import ApplicationForm from "./ApplicationForm"
import PartnerForm from "./PartnerForm"
import PartnersAndApplicationAccordion from "./PartnersAndApplicationAccordion"
import PartnersAndApplicationTabHeader from "./PartnersAndApplicationTabHeader"
import { ODSInstance } from "../../../core/ODSInstance.types"

interface PartnersAndApplicationTabContentProps {
    instance: ODSInstance | null
    schoolYear: number
}

const  PartnersAndApplicationTabContent = ({ instance, schoolYear }: PartnersAndApplicationTabContentProps) => {
    const [elementToShow, setElementToShow] = useState<"accordion" | "edit partner" | "add partner" | "add application" | "edit application">("accordion")
    const [selectedApplication, setSelectedApplication] = useState<EdfiApplication | undefined>()
    const adminConfig = useContext(adminConsoleContext)
    const { deleteVendorForSchoolYear } = useEdfiVendorsService()
    const [ isDeletingVendor, setIsDeletingVendor ] = useState<DeletingState>({ deleting: false, id: '' })
    const { 
        vendorsWithApplicationsList,
        onSelectPartner,
        onRefreshVendorsWithApplications } = usePartnersAndApplicationsAccordion({ 
            schoolYear 
        })
    
    const { deleteEdfiApplicationForSchoolYear } = useEdfiApplicationsService()
    const [isDeletingApplication, setIsDeletingApplication] = useState<DeletingState>({ deleting: false, id: '' })
    const { successToast, errorToast } = useEDXToast()

    const onAddPartner = () => setElementToShow("add partner")
    const onEditPartner = () => setElementToShow("edit partner")
    const onAddApplication = () => setElementToShow("add application")
    const onEditApplication = (application: EdfiApplication) => {
        setSelectedApplication(application)
        setElementToShow("edit application")
    }

    const onDeleteVendor = async (vendorId: string) => {
        if (adminConfig) {
            console.log('vendor id', vendorId)

            setIsDeletingVendor({ deleting: true, id: vendorId })

            const result = await deleteVendorForSchoolYear(adminConfig.edfiActionParams, { vendorId }, schoolYear)
            setIsDeletingVendor({ deleting: false, id: vendorId })
            
            if (result.type === 'Response') {
                successToast(`Deleted partner of id ${vendorId}.`)

                await onRefreshVendorsWithApplications()
                return 
            }

            errorToast("Failed to delete partner.")
        }
    }

    const handleDeleteApplication = async (applicationId: string) => {
        if (adminConfig) {
            setIsDeletingApplication({ deleting: true, id: applicationId })
            const result = await deleteEdfiApplicationForSchoolYear(adminConfig.edfiActionParams, { applicationId }, schoolYear)
            setIsDeletingApplication({ deleting: true, id: applicationId })

            if (result.type === 'Response') {
                successToast(`Deleted application of id ${applicationId}`)

                await onRefreshVendorsWithApplications()
                return 
            }

            errorToast("Failed to delete Application.")
        }
    }

    const onReturnToAccordion = async () => {
        console.log('return to accordion')
        setElementToShow("accordion")

        await onRefreshVendorsWithApplications()
    }

    return (
        <Flex flexDir='column' w='full'>
            <Flex flexDir='column' w='full'>
                <PartnersAndApplicationTabHeader onAddPartner={onAddPartner} />
                <Flex mt='16px' w='full'>
                    <PartnersAndApplicationAccordion 
                        vendorsWithApplicationsList={vendorsWithApplicationsList}
                        isDeletingPartner={isDeletingVendor}
                        isDeletingApplication={isDeletingApplication}
                        onSelectPartner={onSelectPartner}
                        onDeletePartner={onDeleteVendor}
                        onDeleteApplication={handleDeleteApplication}
                        onAddApplication={onAddApplication}
                        onEditApplication={onEditApplication}
                        onEditPartner={onEditPartner} />
                </Flex>
            </Flex> 
            
            <ConsoleModal 
                content={<PartnerForm 
                    schoolYear={schoolYear}
                    mode="add" 
                    onFinishSave={onReturnToAccordion} />}
                show={elementToShow === 'add partner'} 
                onClose={onReturnToAccordion} />

            <ConsoleModal 
                content={<PartnerForm 
                    schoolYear={schoolYear}
                    mode="edit" 
                    onFinishSave={onReturnToAccordion} />}
                show={elementToShow === 'edit partner'} 
                onClose={onReturnToAccordion} />

            <ConsoleModal 
                content={<ApplicationForm 
                    instance={instance}
                    schoolYear={schoolYear}
                    mode='add' 
                    onFinishSave={onReturnToAccordion} />}
                show={elementToShow === 'add application'} 
                onClose={onReturnToAccordion} />

            <ConsoleModal 
                content={<ApplicationForm 
                    instance={instance}
                    schoolYear={schoolYear}
                    mode='edit' 
                    editApplicationData={selectedApplication}
                    onFinishSave={onReturnToAccordion} />}
                show={elementToShow === 'edit application'} 
                onClose={onReturnToAccordion} />
        </Flex> 
    )
}

export default PartnersAndApplicationTabContent