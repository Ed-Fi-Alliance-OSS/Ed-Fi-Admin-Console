import { ChangeEvent, useContext, useEffect, useState } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { AppUser } from "../../../core/AppUser.types"
import { DeletingState } from "../../../core/deletingState.types"
import { Organization, StaffClassification } from "../../../core/Tenant.types"
import { UserEducationOrganizationData } from "../../../core/userEducationOrganizations/UserEducationOrganizations.types"
import useUserService from "../../../services/AdminActions/Users/UsersService"
import { CreateUserEducationOrganizationsRequest, DeleteUserEducationOrganizationsRequest, GetOrganizationsRequest, GetStaffClassificationsRequest, GetUserEducationOrganizationsRequest, UpdateUserEducationOrganizationsRequest } from "../../../services/AdminActions/Users/UsersService.requests"
import useEDXToast from "../../common/useEDXToast"
import { EdOrgViewItem, UserEducationOrganizationsHook } from "./useUserEducationOrganizations.types"


interface UseUserEducationOrganizationsParams {
    selectedUser: AppUser
}

const useUserEducationOrganizations = ({ selectedUser }: UseUserEducationOrganizationsParams): UserEducationOrganizationsHook => {
    const adminConfig = useContext(adminConsoleContext)
    const [organizationsList, setOrganizationsList] = useState<Organization[]>([])
    const [userEdOrgsList, setUserEdOrgsList] = useState<UserEducationOrganizationData[]>([])
    const [viewEdOrgsList, setViewEdOrgsList] = useState<EdOrgViewItem[]>([])
    const [staffClassificationsList, setStaffClassificationsList] = useState<StaffClassification[]>([])
    const { 
        getOrganizations, 
        getStaffClassifications, 
        getUserEducationOrganization, 
        createUserEducationOrganization,
        updateUserEducationOrganization,
        deleteUserEducationOrganization } = useUserService()
    const [educationOrganizationName, setEducationOrganizationName] = useState("")
    const [staffClassificationDescriptor, setStaffClassificationDescriptor] = useState("")
    const [edOrgToEdit, setEdOrgToEdit] = useState<EdOrgViewItem | null>(null)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [isCreatingUserEducationOrganization, setIsCreatingUserEducationOrganization] = useState(false) 
    const [isDeletingUserEducationOrganization, setIsDeletingUserEducationOrganization] = useState<DeletingState>({ deleting: false, id: '' }) 
    const [isUpdatingUserEducationOrganization, setIsUpdatingUserEducationOrganization] = useState(false)
    const { successToast, errorToast } = useEDXToast()
    const [showAddItem, setShowAddItem] = useState(false)

    // console.log("edorg name", educationOrganizationName)
    // console.log("staff class", staffClassificationDescriptor)

    const onShowAddItem = () => {
        if (organizationsList.length > 0) {  
            const identifierValue = organizationsList[0].identifierValue

            setEducationOrganizationName(identifierValue)
        }

        if (staffClassificationsList.length > 0) {
            const namespace = staffClassificationsList[0].varNamespace
            const codeValue = staffClassificationsList[0].codeValue
            const selectedStaffClassificationDescriptor = `${namespace}#${codeValue}`

            setStaffClassificationDescriptor(selectedStaffClassificationDescriptor)
        }

        setShowAddItem(true)
    }

    const onCloseAddItem = () => {
        setShowAddItem(false)
        
        setEducationOrganizationName("")
        setStaffClassificationDescriptor("")
    }

    const onEditEdOrg = (educationOrganizationId: string, staffClassification: string) => {
        const educationOrganization = userEdOrgsList.find(edOrg => edOrg.educationOrganizationId === educationOrganizationId)

        if (educationOrganization) {
            setEducationOrganizationName(educationOrganizationId)
            setStaffClassificationDescriptor(staffClassification)
            setEdOrgToEdit(convertEdOrgToEdViewItem(educationOrganization, staffClassification))
        }
    }

    const onCancelEdit = () => {
        setEdOrgToEdit(null)
        resetFormFields()
    } 

    const onSelectStaffClassificationDescriptor = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log('staff classification descriptor', e.target.value)
        setStaffClassificationDescriptor(e.target.value)
    }

    const onSelectEducationOrganizationName = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log("education organization name", e.target.value)
        setEducationOrganizationName(e.target.value)
    }

    const onUpdateEducationOrganization = async (educationOrganizationId: string) => {
        if (adminConfig) {
            // console.log('on update ed org', edOrgToEdit)
            const educationOrgToEdit = userEdOrgsList.find(ueo => ueo.educationOrganizationId == educationOrganizationId)

            // console.log("education org to edit", educationOrgToEdit)
            // console.log("staffclassification value", staffClassificationDescriptor)

            const staffClassificationsData: string[] = educationOrgToEdit? educationOrgToEdit.staffClassifications.map(sc => {
                if (sc !== edOrgToEdit?.staffClassification)
                    return sc
                
                return staffClassificationDescriptor
            }) : []

            const request: UpdateUserEducationOrganizationsRequest = {
                userId: selectedUser.userId,
                tenantId: adminConfig.actionParams.tenantId,
                educationOrganizationId: educationOrganizationId.toString(),
                staffClassifications: staffClassificationsData
            }

            console.log('update edorg request', request)

            setIsUpdatingUserEducationOrganization(true)
            const result = await updateUserEducationOrganization(adminConfig.actionParams, request)
            setIsUpdatingUserEducationOrganization(false)

            if (result.type === 'Response')
                successToast("Updated Education Organization")
            else 
                errorToast('Failed to edit Education Organization')

            setEdOrgToEdit(null)
            await onRefresh()
        } 
    }

    const deleteEdOrg = async (educationOrganizationId: string) => {
        if (adminConfig) {
            const request: DeleteUserEducationOrganizationsRequest = {
                userId: selectedUser.userId,
                educationOrganizationId
            }

            setIsDeletingUserEducationOrganization({ deleting: true, id: educationOrganizationId })
            const result = await deleteUserEducationOrganization(adminConfig.actionParams, request)
            setIsDeletingUserEducationOrganization({ deleting: false, id: educationOrganizationId })

            if (result.type === 'Response')
                successToast("Deleted Education Organization")
            else 
                errorToast('Failed to delete Education Organization')
        }
    }

    const removeStaffClassificationFromEdOrg = async (edOrg: UserEducationOrganizationData, staffClassification: string) => {
        if (adminConfig) {
            const staffClassificationsData = edOrg.staffClassifications.filter(sc => sc !== staffClassification)

            const request: UpdateUserEducationOrganizationsRequest = {
                userId: selectedUser.userId,
                tenantId: adminConfig.actionParams.tenantId,
                educationOrganizationId: edOrg.educationOrganizationId.toString(),
                staffClassifications: staffClassificationsData
            }
    
            console.log('Add Remove classification from edorg request', request)
    
            setIsCreatingUserEducationOrganization(true)
            const result = await updateUserEducationOrganization(adminConfig.actionParams, request)
            setIsCreatingUserEducationOrganization(false)
    
            if (result.type === 'Response')
                successToast("Removed staff classification")
            else 
                errorToast('Failed to remove staff classification')
        }
    }

    const onDeleteEducationOrganization = async (educationOrganizationId: string, staffClassification: string) => {
        if (adminConfig) {
           const edOrg = userEdOrgsList.find(ueo => ueo.educationOrganizationId == educationOrganizationId)

           if (edOrg) {
                if (edOrg.staffClassifications.length === 1)
                    await deleteEdOrg(educationOrganizationId)
                else
                    await removeStaffClassificationFromEdOrg(edOrg, staffClassification)
           }

           await onRefresh()
        }
    }

    const resetFormFields = () => {
        setEducationOrganizationName("")
        setStaffClassificationDescriptor("")
    }

    const createEdOrg = async () => {
        if (!adminConfig)
            return 

        const staffClassificationsData: string[] = []
        staffClassificationsData.push(staffClassificationDescriptor)

        const request: CreateUserEducationOrganizationsRequest = {
            userId: selectedUser.userId,
            tenantId: adminConfig.actionParams.tenantId,
            educationOrganizationId: educationOrganizationName,
            educationOrganizationName: educationOrganizationName,
            staffClassifications: staffClassificationsData
        }

        setIsCreatingUserEducationOrganization(true)
        const result = await createUserEducationOrganization(adminConfig.actionParams, request)
        setIsCreatingUserEducationOrganization(false)

        if (result.type === 'Response')
            successToast("Added education organization")
        else
            errorToast("Failed to create education organization")
    }

    const addStaffClassificationToEdOrg = async (edOrg: UserEducationOrganizationData) => {
        if (adminConfig) {
            const staffClassificationsData = edOrg.staffClassifications.map(sc => sc)
            staffClassificationsData.unshift(staffClassificationDescriptor)

            const request: UpdateUserEducationOrganizationsRequest = {
                userId: selectedUser.userId,
                tenantId: adminConfig.actionParams.tenantId,
                educationOrganizationId: edOrg.educationOrganizationId.toString(),
                staffClassifications: staffClassificationsData
            }
    
            console.log('Add staff classification to edorg request', request)
    
            setIsCreatingUserEducationOrganization(true)
            const result = await updateUserEducationOrganization(adminConfig.actionParams, request)
            setIsCreatingUserEducationOrganization(false)
    
            if (result.type === 'Response')
                successToast("Added staff classification")
            else 
                errorToast('Failed to add staff classification')
        }
    }

    const edOrgExists = (edOrgId: string): UserEducationOrganizationData | undefined => {
        const edOrg = userEdOrgsList.find(ueo => ueo.educationOrganizationId == edOrgId)

        return edOrg
    }

    const edOrgHasStaffClassification = (edOrg: UserEducationOrganizationData, staffClassification: string): boolean => {
        return edOrg.staffClassifications.includes(staffClassification)
    }

    const onSaveEdOrgs = async () => {
        if (adminConfig && educationOrganizationName !== '' && staffClassificationDescriptor !== '') {
            console.log('save user education organization')

            const edOrg = edOrgExists(educationOrganizationName)

            if (!edOrg)
                await createEdOrg()
            else if (edOrg) {
                if (edOrgHasStaffClassification(edOrg, staffClassificationDescriptor))
                    return undefined
                    // return errorToast("Education Organization already exists.")

                await addStaffClassificationToEdOrg(edOrg)
            }

            resetFormFields()
            onCloseAddItem()

            setEdOrgToEdit(null)
            await onRefresh()
        }
    }

    const fetchUserOrganizations = async () => {
        if (adminConfig) {
            const request: GetUserEducationOrganizationsRequest = {
                userId: selectedUser.userId 
            }

            const result = await getUserEducationOrganization(adminConfig.actionParams, request)
            if (result.type === 'Response') {
                // console.log('user organizations list', result.data.data)
                setUserEdOrgsList(result.data.data)
                setViewEdOrgsList(mapEdOrgsToViewEdOrgs(result.data.data))
            }
        }
    }

    const fetchOrganizations = async () => {
        if (adminConfig) {
            const request: GetOrganizationsRequest = {
                pageIndex: 0,
                pageSize: 100
            }

            const result = await getOrganizations(adminConfig.actionParams, request)
            if (result.type === 'Response') {
                // console.log('organizations list', result.data.data)
                setOrganizationsList(result.data.data)
            }
        }
    }

    const fetchStaffClassifications = async () => {
        if (adminConfig) {
            const request: GetStaffClassificationsRequest = {
                pageIndex: 0,
                pageSize: 100
            }

            const result = await getStaffClassifications(adminConfig.actionParams, request)
            if (result.type === 'Response') {
                // console.log('staff classifications list', result.data.data)
                setStaffClassificationsList(result.data.data)
            }
        }
    }

    const fetchData = async () => {
        setIsFetchingData(true)

        await fetchUserOrganizations()
        await fetchOrganizations()
        await fetchStaffClassifications()

        setIsFetchingData(false)
    }

    const onRefresh = async () => await fetchData()

    const convertEdOrgToEdViewItem = (edOrg: UserEducationOrganizationData, staffClassification: string): EdOrgViewItem => {
        return {
            educationOrganizationId: edOrg.educationOrganizationId,
            nameOfInstitution: edOrg.nameOfInstitution,
            shortNameOfInstitution: edOrg.shortNameOfInstitution,
            staffClassification,
            source: edOrg.source
        }
    }

    const mapEdOrgsToViewEdOrgs = (edOrgsList: UserEducationOrganizationData[]): EdOrgViewItem[] => {
        const viewList: EdOrgViewItem[] = []

        for (let item of edOrgsList) {
            if (item.staffClassifications.length >= 1) {
                for (let staffClassification of item.staffClassifications)
                    viewList.push(convertEdOrgToEdViewItem(item, staffClassification))
            }
        }

        return viewList
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        educationOrganizationName,
        staffClassificationDescriptor,
        userEdOrgsList,
        viewEdOrgsList,
        organizationsList,
        staffClassificationsList,
        isFetchingData, 
        isCreatingUserEducationOrganization,
        isUpdatingUserEducationOrganization,
        isDeletingUserEducationOrganization,
        showAddItem,
        edOrgToEdit,
        onShowAddItem,
        onRefresh,
        onUpdateEducationOrganization,
        onSelectEducationOrganizationName,
        onSelectStaffClassificationDescriptor,
        onSaveEdOrgs,
        onCancelEdit, 
        onCloseAddItem,
        onEditEdOrg,
        onDeleteEducationOrganization
    }
}

export default useUserEducationOrganizations