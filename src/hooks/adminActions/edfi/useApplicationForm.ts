import { TEEAuthDataContext, Tenant, UserProfileContext } from "@edwire/edx-portal-shared"
import { ChangeEvent, useState, useEffect, useContext } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { EdfiApplication, EdfiApplicationAuthData } from "../../../core/Edfi/EdfiApplications"
import { EdfiClaimSet } from "../../../core/Edfi/EdfiClaimsets"
import { EdfiVendor } from "../../../core/Edfi/EdfiVendors"
import { CreateEdfiApplicationRequest, ResetEdfiApplicationCredentialsRequest, UpdateEdfiApplicationRequest } from "../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests"
import useEdfiApplicationsService from "../../../services/AdminActions/Edfi/Applications/EdfiApplicationsService"
import useEdfiClaimsetService from "../../../services/AdminActions/Edfi/ClaimSets/ClaimsetsService"
import useEdfiVendorsService from "../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService"
import useEDXToast from "../../common/useEDXToast"
import useTenantInfo from "../../useTenantInfo"
import { initialApplicationData } from "./initialApplicationData"
import useApplicationFormValidation from "./useApplicationFormValidation"

type UseApplicationFormMode = 'add' | 'edit'

interface UseApplicationFormProps {
    schoolYear: number 
    mode: UseApplicationFormMode
    editApplicationData?: EdfiApplication
    onFinishSave: () => void
}

const selectInitialFormData = (mode: UseApplicationFormMode, currentTenant: Tenant | undefined, editApplicationData?: EdfiApplication) => {
    if (mode === 'edit' && editApplicationData) {
        console.log('edit application data', editApplicationData)

        const educationorgIds: Array<string | number> = []
        educationorgIds.push(editApplicationData.educationOrganizationId ?? 0)

        const initialData: UpdateEdfiApplicationRequest = {
            applicationName: editApplicationData.applicationName ?? "",
            vendorId: editApplicationData.vendorId ?? 0,
            claimSetName: editApplicationData.claimSetName ?? "",
            educationOrganizationIds: educationorgIds
        }

        console.log('initial data for edit', initialData)

        return initialData
    }

    const initialData: CreateEdfiApplicationRequest = {
        applicationName: initialApplicationData.applicationName,
        vendorId: initialApplicationData.vendorId,
        claimSetName: initialApplicationData.claimSetName,
        educationOrganizationIds: []
    }

    if (currentTenant) {
        const currentOrgId = currentTenant.organizationIdentifier

        if (currentOrgId)
            initialData.educationOrganizationIds.push(currentOrgId)
    }

    return initialData
}

const useApplicationForm = ({ schoolYear, mode, onFinishSave, editApplicationData }: UseApplicationFormProps) => { 
    const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
    const { userProfile } = useContext(UserProfileContext)
    const { getVendorsListForSchoolYear } = useEdfiVendorsService()
    const { 
        createEdfiApplicationForSchoolYear, 
        updateEdfiApplicationForSchoolYear, 
        resetApplicationCredentialsForSchoolYear } = useEdfiApplicationsService()
    const { getClaimsetsListForSchoolYear } = useEdfiClaimsetService()
    const adminConfig = useContext(adminConsoleContext)
    const { getCurrentTenant } = useTenantInfo()
    const [applicationData, setApplicationData] = useState<CreateEdfiApplicationRequest | UpdateEdfiApplicationRequest>(() => selectInitialFormData(mode, getCurrentTenant(), editApplicationData))
    const [selectedApplicationId, setSelectedApplicationId] = useState<number>(editApplicationData? editApplicationData.applicationId : 0)
    const [vendorOptionsList, setVendorOptionsList] = useState<EdfiVendor[]>([])
    const [claimsOptionsList, setClaimsOptionsList] = useState<EdfiClaimSet[]>([])
    const [operationalContext, setOperationalContext] = useState<string>("")
    const [applicationAuthData, setApplicationAuthData] = useState<EdfiApplicationAuthData>({ 
        applicationId: editApplicationData? editApplicationData.applicationId : 0,
        secret: mode === 'edit'? "applicationSecret" : "",
        key: mode === "edit"? "applicationKey" : ""
    })
    const [isSaving, setIsSaving] = useState(false)
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
    const { errorToast, successToast } = useEDXToast()
    const { errors, validApplicationData, validateField } = useApplicationFormValidation()
    const [selectedOrgId, setSelectedOrgId] = useState(false)
    const [ isRegeneratingCredentials, setIsRegeneratingCredentials ] = useState(false)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const napplicationData = {...applicationData}

        if (e.target.id === "operationalContextURI") {
            setOperationalContext(e.target.value)
        }
        if (e.target.id === "applicationName") {
            napplicationData.applicationName = e.target.value

            if (hasTriedSubmit)
                validateField("applicationName", napplicationData)

            setApplicationData(napplicationData)
        }
    }

    // console.log("user profile", userProfile)
    console.log("application data", applicationData)

    const onToggleOrgId = () => {
        console.log('toggle org id')

        if (userProfile) {
            const educationOrgId = getCurrentTenant()?.organizationIdentifier
            const napplicationData = {...applicationData}

            if (educationOrgId) {
                const includedOrganizationId = napplicationData.educationOrganizationIds.find(edOrgId => edOrgId === educationOrgId)

                if (includedOrganizationId) {
                    const norgIdsList = [...napplicationData.educationOrganizationIds].filter(id => id !== includedOrganizationId)
                    napplicationData.educationOrganizationIds = norgIdsList
                    setApplicationData(napplicationData)
                }
                else {
                    napplicationData.educationOrganizationIds.push(educationOrgId)
                    setApplicationData(napplicationData)
                }
            }

            setSelectedOrgId(!selectedOrgId)
        }
    }

    const onSelectVendor = (vendorId: number) => {
        const napplicationData = {...applicationData}

        napplicationData.vendorId = vendorId

        if (hasTriedSubmit)
            validateField("vendor", napplicationData)

        setApplicationData(napplicationData)
    }

    const onSelectClaim = (claimName: string) => {
        const napplicationData = {...applicationData}

        napplicationData.claimSetName = claimName

        if (hasTriedSubmit)
            validateField("claimset", napplicationData)

        setApplicationData(napplicationData)
    }

    const onRegenerateCredentials = async (applicationId: number) => {
        if (edxAppConfig && auth && auth.user && adminConfig) {
            const requestData: ResetEdfiApplicationCredentialsRequest = {
                applicationId: applicationId.toString()
            }

            console.log('request data credentials', requestData)
            setIsRegeneratingCredentials(true)
    
            const result = await resetApplicationCredentialsForSchoolYear(adminConfig.actionParams, requestData, schoolYear)
            setIsRegeneratingCredentials(false)

            if (result.type === 'Response') {
                setApplicationAuthData(result.data)
                return 
            }

            errorToast("Failed to regenerate application credentials.")
        }

        return null
    }

    const onSave = async () => {
        if (edxAppConfig && auth && auth.user && adminConfig) {
            console.log('data to send', applicationData)

            setIsSaving(true)

            if (mode === 'add') {
                if (validApplicationData(applicationData)) {
                    const result = await createEdfiApplicationForSchoolYear(adminConfig.actionParams, {
                        applicationName: applicationData.applicationName,
                        vendorId: applicationData.vendorId,
                        claimSetName: applicationData.claimSetName,
                        educationOrganizationIds: applicationData.educationOrganizationIds
                    }, schoolYear)
                    
                    console.log('result create application', result)

                    if (result.type === 'Response') {
                        setApplicationAuthData(result.data)
                        successToast("Added Application.")
                    }
                    else 
                        errorToast("Failed to Add Application.")
                }
                else 
                    setHasTriedSubmit(true)
            }
            else {
                console.log("edit", validApplicationData(applicationData))

                if (validApplicationData(applicationData)) {
                    console.log("valid application data edit")

                    const currentTenant = getCurrentTenant()
                    const educationOrganizationIds: string[] = [ currentTenant? currentTenant.organizationIdentifier : "unknown" ]

                    const result = await updateEdfiApplicationForSchoolYear(adminConfig.actionParams, selectedApplicationId+'', {
                        applicationName: applicationData.applicationName,
                        claimSetName: applicationData.claimSetName,
                        vendorId: applicationData.vendorId,
                        educationOrganizationIds: educationOrganizationIds
                    }, schoolYear)
    
                    console.log('result update application', result)

                    if (result.type === 'Response') {
                        setApplicationAuthData(result.data)
                        successToast("Updated Application.")
                    }
                    else 
                        errorToast("Failed to Update Application.")
                }
                else 
                    setHasTriedSubmit(true)
                
                onFinishSave()
            }
                
            setIsSaving(false)
        }
    }

    const fetchVendorsList = async () => {
        if (edxAppConfig && auth && auth.user && adminConfig) {
            const vendorsListData = await getVendorsListForSchoolYear(adminConfig.actionParams, schoolYear)
            const claimsetsListData = await getClaimsetsListForSchoolYear(adminConfig.actionParams, schoolYear)

            console.log('claimsets list data', claimsetsListData)

            if (vendorsListData.type === 'Response' && claimsetsListData.type === 'Response') {
                vendorsListData.data.unshift({ vendorId: 0, company: 'Select Option' })
                claimsetsListData.data.unshift({ id: 0, name: 'Select Option', applicationsCount: 0, isSystemReserved: false })
                setVendorOptionsList(vendorsListData.data)
                setClaimsOptionsList(claimsetsListData.data)
            }
        }
    }   

    useEffect(() => {
        fetchVendorsList()
    }, [])

    return {
        applicationData,
        selectedApplicationId,
        vendorOptionsList,
        claimsOptionsList,
        operationalContext,
        applicationAuthData,
        isSaving,
        isRegeneratingCredentials,
        hasTriedSubmit,
        errors,
        selectedOrgId,
        onToggleOrgId,
        onRegenerateCredentials,
        onSelectVendor,
        onSelectClaim,
        onChangeInput,
        onSave
    }
}

export default useApplicationForm