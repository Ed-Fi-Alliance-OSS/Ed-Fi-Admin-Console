import { TEEAuthDataContext } from '@edfi/admin-console-shared-sdk'
import { useState, useEffect, useContext, ChangeEvent } from 'react'
import { AdminConsoleConfig, adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdfiApplicationAuthData } from '../../../core/Edfi/EdfiApplications'
import { SISProviderConnectionState } from '../../../core/sisProviders/SISProviders.types'
import { EdfiActionParams } from '../../../services/AdminActions/adminAction.types'
import { CreateEdfiApplicationRequest, ResetEdfiApplicationCredentialsRequest } from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'
import useEdfiApplicationsService from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationsService'
import useEdfiVendorsService from '../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService'
import useEDXToast from '../../common/useEDXToast'
import useTenantInfo from '../../useTenantInfo'
import { CheckEdfiApplicationResult, OptionalProvidersOption, SISProvidersOption } from './useSISProvidersForm.types'

const sisProviders: SISProvidersOption[] = [
    { value: 'empty', text: "Select Provider" }
]

interface UseSISProvidersFormProps {
    schoolYear: number | null
    onSelectSISProvider: (sisProvider: string, source: string) => void
    onUnselectSISProvider: (sisProviderType: "required" | "optional") => void
}

const optionalSISSources: OptionalProvidersOption[] = [
    { value: "Unknown", text: "Select Provider Function" },
    { value: "HR", text: "HR" },
    { value: "Finance", text: "Finance" },
    { value: "Staff", text: "Staff" }
]

const useSISProvidersForm = ({ schoolYear, onSelectSISProvider, onUnselectSISProvider }: UseSISProvidersFormProps) => {
    const adminConfig = useContext(adminConsoleContext)
    const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
    const { createEdfiApplicationForSchoolYear, resetApplicationCredentialsForSchoolYear } = useEdfiApplicationsService()
    const { getVendorsListForSchoolYear, getVendorApplicationsForSchoolYear } = useEdfiVendorsService()
    const [sisProvidersOptionList, setSISProvidersOptionList] = useState<SISProvidersOption[]>([...sisProviders])
    const { getCurrentTenant } = useTenantInfo()
    const [selectedOptionalProviderId, setSelectedOptionalProviderId] = useState<string>("")
    const [selectedProviderId, setSelectedProviderId] = useState(sisProvidersOptionList[0].value)
    const [hasSelectedProvider, setHasSelectedProvider] = useState(false)
    const [hasSelectedOptionalProvider, setHasSelectedOptionalProvider] = useState(false)
    const [source, setSource] = useState("SIS")
    const [optionalSource, setOptionalSource] = useState(optionalSISSources[0].value)
    
    const [connectionState, setConnectionState] = useState<SISProviderConnectionState>("Awaiting Connection")
    const [edfiApplicationAuthData, setEdfiApplicationAuthData] = useState<EdfiApplicationAuthData>({ applicationId: 0 })
    const [isCreatingEdfiApplication, setIsCreatingEdfiApplication] = useState(false)
    const [isLoadingCredentials, setIsLoadingCredentials] = useState(false)

    const [optionalConnectionState, setOptionalConnectionState] = useState<SISProviderConnectionState>("Awaiting Connection")
    const [optionaEdfiApplicationAuthData, setOptionalEdfiApplicationAuthData] = useState<EdfiApplicationAuthData>({ applicationId: 0 })
    const [isCreatingOptionalEdfiApplication, setIsCreatingOptionalEdfiApplication] = useState(false)
    const [isLoadingOptionalCredentials, setIsLoadingOptionalCredentials] = useState(false)

    const [showOptionalForm, setShowOptionalForm] = useState(false)

    const { successToast, errorToast } = useEDXToast()

    // console.log("source in sis hook", source)
    // console.log("optional source in sis hook", optionalSource)

    const onShowOptionalForm = () => setShowOptionalForm(true)

    const generateEdfiApplicationNameFromSource = (vendorName: string, organizationName: string, applicationSource: string) => `${vendorName} ${applicationSource} ${organizationName}`

    const generateRequiredEdfiApplication = async (adminConfig: AdminConsoleConfig, edfiApplicationName: string, data: CreateEdfiApplicationRequest) => {
        if (!schoolYear)
            return 

        setIsCreatingEdfiApplication(true)
        const result = await createEdfiApplicationForSchoolYear(adminConfig.edfiActionParams, data, schoolYear)

        if (result.type === 'Response') {
            setConnectionState("Connected")
            setEdfiApplicationAuthData({
                applicationId: result.data.applicationId,
                key: result.data.key,
                secret: result.data.secret
            })
            successToast(`Created ${edfiApplicationName}`)
        }
        else 
            errorToast("Unable to generate credentials. Please contact your administrator.")

        setIsCreatingEdfiApplication(false)
    }

    const generateOptionalEdfiApplication = async (adminConfig: AdminConsoleConfig, edfiApplicationName: string, data: CreateEdfiApplicationRequest) => {
        if (!schoolYear)
            return 

        setIsCreatingOptionalEdfiApplication(true)
        const result = await createEdfiApplicationForSchoolYear(adminConfig.edfiActionParams, data, schoolYear)

        if (result.type === 'Response') {
            setOptionalConnectionState("Connected")
            setOptionalEdfiApplicationAuthData({
                applicationId: result.data.applicationId,
                key: result.data.key,
                secret: result.data.secret
            })
            successToast(`Created ${edfiApplicationName}`)
        }
        else 
            errorToast("Unable to generate credentials. Please contact your administrator.")

        setIsCreatingOptionalEdfiApplication(false)
    }

    const generateEdfiApplication = async (provider: SISProvidersOption, edfiApplicationName: string, formType: "required" | "optional") => {
        const currentTenant = getCurrentTenant()
        
        if (currentTenant && adminConfig) {
            console.log("generate edfi application")

            const educationOrganizationIds: string[] = []
            educationOrganizationIds.push(currentTenant.organizationIdentifier)

            const data: CreateEdfiApplicationRequest = {
                applicationName: edfiApplicationName,
                vendorId: parseInt(provider.value),
                claimSetName: "SIS/HR/Finance Vendor",
                educationOrganizationIds
            }

            console.log("edfi application data", data)

            if (formType === "required")
                return await generateRequiredEdfiApplication(adminConfig, edfiApplicationName, data)

            await generateOptionalEdfiApplication(adminConfig, edfiApplicationName, data)
        }
    }

    const checkIfEdfiApplicationExists = async (vendorId: string, edfiApplicationName: string, year: number): Promise<CheckEdfiApplicationResult> => {
        if (adminConfig) {
            const vendorApplicationsRequest = await getVendorApplicationsForSchoolYear(adminConfig.edfiActionParams, vendorId, year)

            if (vendorApplicationsRequest.type === 'Response') {
                const edfiApplicationsFilteredList = vendorApplicationsRequest.data.filter(app => app.applicationName === edfiApplicationName)

                if (edfiApplicationsFilteredList.length > 0)
                    return { exists: true, applicationId: edfiApplicationsFilteredList[0].applicationId }

                return { exists: false }
            }
        }

        return { exists: false, error: true }
    }

    const createApplicationFromProvider = async (providerId: string, formType: "required" | "optional", applicationSource: string, year: number) => {
        if (providerId !== sisProviders[0].value) {

            if (formType === 'required') {
                setSelectedProviderId(providerId)
                setHasSelectedProvider(true)
            }
            else {
                setSelectedOptionalProviderId(providerId)
                setHasSelectedOptionalProvider(true)
            }

            const selectedProvider = sisProvidersOptionList.find(option => option.value === providerId)
            const selectedSISProviderSource = formType === "required"? source : applicationSource

            onSelectSISProvider(selectedProvider?.text ?? "", selectedSISProviderSource)

            const currentTenant = getCurrentTenant()

            if (selectedProvider && currentTenant) {
                console.log("source for application name", source)
                const edfiApplicationName = generateEdfiApplicationNameFromSource(
                    selectedProvider.text ?? "",
                    currentTenant.organizationName,
                    applicationSource
                )

                const checkResult = await checkIfEdfiApplicationExists(selectedProvider.value, edfiApplicationName, year)
                console.log("check result", checkResult)

                if (!checkResult.exists && !checkResult.error)
                    await generateEdfiApplication(selectedProvider, edfiApplicationName, formType)
                else if (checkResult.exists && !checkResult.error && checkResult.applicationId) {
                    
                    if (formType === 'required') {
                        setConnectionState("Connected")

                        return setEdfiApplicationAuthData({
                            applicationId: checkResult.applicationId,
                            key: "key",
                            secret: "secret"
                        })
                    }
                    
                    setOptionalConnectionState("Connected")
                    setOptionalEdfiApplicationAuthData({
                        applicationId: checkResult.applicationId,
                        key: "key",
                        secret: "secret"
                    })
                }
            }
        }
    }

    const handleChangeOptionalProvider = async (providerId: string, applicationSource: string) => {
        if (!schoolYear)
            return 

        await createApplicationFromProvider(providerId, 'optional', applicationSource, schoolYear)
    }

    const handleChangeSISprovider = async (e: ChangeEvent<HTMLSelectElement>) => {
        if (!schoolYear)
            return 
        // console.log('selected sis provider', e.target.value)

        await createApplicationFromProvider(e.target.value, "required", source, schoolYear)
    }

    const hasCompletedSelection = (provider: string, source: string) => {
        if (source !== "Unknown" && provider && provider !== sisProvidersOptionList[0].value)
            return true
        
        return false
    }

    const onChangeOptionalProvider = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log("1: provider", e.target.value)
        // console.log('1: source', optionalSource)
        setSelectedOptionalProviderId(e.target.value)

        if (hasCompletedSelection(e.target.value, optionalSource))
            handleChangeOptionalProvider(e.target.value, optionalSource)
    }

    const onChangeOptionalSource = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log("2: provider", selectedOptionalProviderId)
        // console.log('2: source', e.target.value)

        setOptionalSource(e.target.value)

        if (hasCompletedSelection(selectedOptionalProviderId, e.target.value))
            handleChangeOptionalProvider(selectedOptionalProviderId, e.target.value)
    }

    const handleRemoveProvider = () => {
        setSelectedProviderId(sisProviders[0].value)
        setHasSelectedProvider(false)

        setEdfiApplicationAuthData({
            applicationId: 0
        })
        
        onUnselectSISProvider("required")
    }
    
    const handleRemoveOptionalProvider = () => {
        setSelectedOptionalProviderId(sisProviders[0].value)
        setOptionalSource(optionalSISSources[0].value)
        setHasSelectedOptionalProvider(false)

        setOptionalEdfiApplicationAuthData({
            applicationId: 0
        })
        
        onUnselectSISProvider("optional")
    }

    const handleChangeCredentials = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'key') {
            setEdfiApplicationAuthData({ 
                applicationId: edfiApplicationAuthData.applicationId,
                key: e.target.value,
                secret: edfiApplicationAuthData.secret
            })
        }

        if (e.target.id === 'secret') {
            setEdfiApplicationAuthData({ 
                applicationId: edfiApplicationAuthData.applicationId,
                key: e.target.value,
                secret: edfiApplicationAuthData.secret
            })
        }
    }

    const handleChangeOptionalCredentials = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'key') {
            setOptionalEdfiApplicationAuthData({ 
                applicationId: edfiApplicationAuthData.applicationId,
                key: e.target.value,
                secret: edfiApplicationAuthData.secret
            })
        }

        if (e.target.id === 'secret') {
            setOptionalEdfiApplicationAuthData({ 
                applicationId: edfiApplicationAuthData.applicationId,
                key: e.target.value,
                secret: edfiApplicationAuthData.secret
            })
        }
    }

    const handleRegenerateCredentials = async () => {
        const result = await fetchAuthDetails(edfiApplicationAuthData.applicationId.toString(), "required")

        if (result && result.type === 'Response' && result.data.key && result.data.secret) {
            setEdfiApplicationAuthData({ 
                applicationId: edfiApplicationAuthData.applicationId,
                key: result.data.key,
                secret: result.data.secret
            })
        }
    }

    const handleRegenerateOptionalCredentials = async () => {
        // console.log("regenerate optional credentials", optionaEdfiApplicationAuthData.applicationId)
        const result = await fetchAuthDetails(optionaEdfiApplicationAuthData.applicationId.toString(), "optional")

        if (result && result.type === 'Response' && result.data.key && result.data.secret) {
            setOptionalEdfiApplicationAuthData({ 
                applicationId: optionaEdfiApplicationAuthData.applicationId,
                key: result.data.key,
                secret: result.data.secret
            })
        }
    }

    const handleChangeEndpoints = () => {}

    const fetchVendorsList = async (actionParams: EdfiActionParams, year: number) => {
        const vendorsList = await getVendorsListForSchoolYear(actionParams, year)

        // console.log('edfi vendors list (sis providers)', )

        return vendorsList
    }   

    const fetchRequiredAuthDetails = async (adminConfig: AdminConsoleConfig, requestData: ResetEdfiApplicationCredentialsRequest) => {
        if (!schoolYear)
            return 

        console.log('request data credentials', requestData)
        setIsLoadingCredentials(true)

        const applicationAuthData = await resetApplicationCredentialsForSchoolYear(adminConfig.actionParams, requestData, schoolYear)
        setIsLoadingCredentials(false)

        console.log('edfi applications auth data (reset credentials)', applicationAuthData)

        return applicationAuthData
    }

    const fetchOptionalAuthDetails = async (adminConfig: AdminConsoleConfig, requestData: ResetEdfiApplicationCredentialsRequest) => {
        if (!schoolYear)
            return 

        console.log('request data credentials', requestData)
        setIsLoadingOptionalCredentials(true)

        const applicationAuthData = await resetApplicationCredentialsForSchoolYear(adminConfig.actionParams, requestData, schoolYear)
        setIsLoadingOptionalCredentials(false)

        console.log('edfi applications auth data (reset credentials)', applicationAuthData)

        return applicationAuthData
    }

    const fetchAuthDetails = async (applicationId: string, fetchFor: "required" | "optional") => {
        if (edxAppConfig && auth && auth.user && adminConfig) {
            console.log('fetch auth details', selectedProviderId)
    
            const requestData: ResetEdfiApplicationCredentialsRequest = {
                applicationId: applicationId
            }

            if (fetchFor === "required")
                return await fetchRequiredAuthDetails(adminConfig, requestData)

            return await fetchOptionalAuthDetails(adminConfig, requestData)
        }

        return null
    }

    const fetchSISProvidersData = async () => {
        if (!schoolYear)
            return 

        if (edxAppConfig && auth && auth.user && adminConfig) {
            const result = await fetchVendorsList(adminConfig.actionParams, schoolYear)
            
            if (result.type === 'Response') {
                const nsisoptionsProvidersList = [...sisProvidersOptionList]
                const availableVendors = ["Ascender", "Aeries", "Frontline", "Power School", "Skyward"]
                const filteredVendorsList = result.data.filter(vendor => {
                    for (let availableVendorName of availableVendors) {
                        if (vendor.company === availableVendorName)
                            return true
                    }

                    return false
                })

                for (let item of filteredVendorsList) {
                    const sisProviderOption: SISProvidersOption = {
                        value: item.vendorId+"",
                        text: item.company ?? ""
                    }

                    nsisoptionsProvidersList.push(sisProviderOption)
                }

                setSISProvidersOptionList(nsisoptionsProvidersList)
            }
        }
    }

    useEffect(() => {
        if (!schoolYear)
            return 

        fetchSISProvidersData()
    }, [ schoolYear ])

    return {
        edfiApplicationAuthData,
        isCreatingEdfiApplication,
        isLoadingCredentials,
        connectionState,
        sisProvidersOptionList,
        selectedProviderId,
        optionalSISSources,
        hasSelectedProvider,
        hasSelectedOptionalProvider,
        source,
        showOptionalForm,
        optionalSource,
        optionalConnectionState,
        optionaEdfiApplicationAuthData,
        isCreatingOptionalEdfiApplication,
        isLoadingOptionalCredentials,
        selectedOptionalProviderId,
        onChangeOptionalProvider,
        onChangeOptionalSource,
        onShowOptionalForm,
        handleRegenerateOptionalCredentials,
        handleChangeOptionalProvider,
        handleChangeCredentials,
        handleChangeOptionalCredentials,
        handleChangeSISprovider,
        handleChangeEndpoints,
        handleRemoveProvider,
        handleRemoveOptionalProvider,
        handleRegenerateCredentials
    }
}

export default useSISProvidersForm