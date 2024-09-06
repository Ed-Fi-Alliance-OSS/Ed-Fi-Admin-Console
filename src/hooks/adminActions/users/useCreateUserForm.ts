import { UserProfileContext, TEEAuthDataContext } from "@edwire/edx-portal-shared"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { AppUser, AppUserProfile } from "../../../core/AppUser.types"
import { Subscription } from "../../../core/Subscription.types"
import useSubscriptionService from "../../../services/AdminActions/Subscriptions/SubscriptionsService"
import { GetSubscriptionsListRequest } from "../../../services/AdminActions/Subscriptions/SubscriptionsService.requests"
import useUserService from "../../../services/AdminActions/Users/UsersService"
import { CheckUserEmailRequest } from "../../../services/AdminActions/Users/UsersService.requests"
import { ApiResponseUser } from "../../../services/AdminActions/Users/UsersService.responses"
import useEDXToast from "../../common/useEDXToast"
import { canAssignLicense } from "./helpers/canAssignLicense"
import { setInitialData } from "./helpers/createUserFormInitialData"
import { CreateUserFormData, CreateUserFormLicensesData, RoleOption, SubscriptionOption, SubscriptionOptionRolesItem, UserFormMode } from "./useCreateUserForm.types"
import useCreateUserFormValidation from "./useCreateUserFormValidation"
import useUserFormActions from "./useUserFormActions"

interface UseCreateUserFormProps {
    formMode?: UserFormMode,
    editUserInitialData?: AppUser
    onAddFinished?: () => void
    onUpdateFinished?: () => void
}

const useCreateUserForm = (props?: UseCreateUserFormProps) => {
    const {auth, edxAppConfig} = useContext(TEEAuthDataContext)
    const {userProfile} = useContext(UserProfileContext)
    const adminConfig = useContext(adminConsoleContext)
    const { checkUserEmail, getUserById } = useUserService()
    const { getSubscriptionsList } = useSubscriptionService()
    const [userData, setUserData] = useState<CreateUserFormData>(() => setInitialData(props?.editUserInitialData, props?.formMode))
    const [subscriptionsOptionList, setSubscriptionsOptionList] = useState<SubscriptionOption[]>([])
    const [mode, setMode] = useState<UserFormMode>(props && props.formMode? props.formMode : 'Add')
    const [savingChanges, setSavingChanges] = useState(false)
    const roleOptions: RoleOption[] = [
        'Tenant.User', 
        'Tenant.Admin'
    ]

    const [ hasTriedSubmit, setHasTriedSubmit ] = useState(false)
    const { validateInputChange, validFormData, errors, resetErrors } = useCreateUserFormValidation()
    const { onAddUser, onInvite, onInviteAdmin, onUpdate, onManageSubscriptions } = useUserFormActions()
    const { errorToast } = useEDXToast()
    const [ userProfileById, setUserProfileById ] = useState<AppUserProfile | null>(null)
    const [ isFetchingProfile, setIsFetchingProfile] = useState(true)

    const pageIndex = 0
    const pageSize = 100

    const onChangeMode = (value: string) => {
        setHasTriedSubmit(false)
        resetErrors()

        if (value === 'Add')
            return setMode('Add')

        if (value === 'Invite')
            return setMode('Invite')

        if (value === 'Edit')
            return setMode('Edit')

        setMode('Manage Subscriptions')
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('input change', e.target.id, e.target.value)
        const nuserData = {...userData}

        if (e.target.id === 'userName')
            nuserData.userName = e.target.value
        else if (e.target.id === 'firstName') {
            nuserData.firstName = e.target.value

            if (hasTriedSubmit) validateInputChange('firstName', nuserData)
        }
        else if (e.target.id === 'lastName') {
            nuserData.lastName = e.target.value

            if (hasTriedSubmit) validateInputChange('lastName', nuserData)
        }
        else if (e.target.id === 'email') {
            nuserData.userName = e.target.value
            nuserData.email = e.target.value

            if (hasTriedSubmit) validateInputChange('email', nuserData)
        }

        return setUserData(nuserData)
    }

    const onRoleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = e.target.value as RoleOption

        const nuserData = {...userData}
        if (e.target.value) 
            nuserData.role = selectedRole

        setUserData(nuserData)
    }

    const onToggleIsAdmin = () => {
        const nuserData = {...userData}

        if (nuserData.role === 'Tenant.Admin')
            nuserData.role = 'Tenant.User'
        else 
            nuserData.role = 'Tenant.Admin'

        setUserData(nuserData)
    }

    const updateSubscriptionOptionRole = (subscriptionId: string, role: string) => {    
        const nsubscriptionsOptionsList = subscriptionsOptionList.map(subscription => ({...subscription}))
        const subscriptionIndex = nsubscriptionsOptionsList.findIndex(subscription => subscription.subscriptionId === subscriptionId)

        if (subscriptionIndex !== -1 && nsubscriptionsOptionsList[subscriptionIndex].roles)
            nsubscriptionsOptionsList[subscriptionIndex].selectedRole = role

        // console.log('update role for subscription option', nsubscriptionsOptionsList[subscriptionIndex])

        setSubscriptionsOptionList(nsubscriptionsOptionsList)
    }

    const onSelectApplicationRoleForUser = (subscriptionId: string, role: string) => {
        // console.log('select role for user in subscription', subscriptionId, role)

        if (role !== '') {
            const nuserData = {...userData}
            const licenseIndex = nuserData.licenses.findIndex(license => license.subscriptionId === subscriptionId)
    
            if (licenseIndex !== -1 && nuserData.licenses[licenseIndex].roles) {
                const licenseRoles = nuserData.licenses[licenseIndex].roles
    
                if (licenseRoles && licenseRoles.length > 0) 
                    nuserData.licenses[licenseIndex].roles = []
    
                nuserData.licenses[licenseIndex].roles?.push(role)
            }
    
            // console.log("selected role user in subscription", nuserData)
            // console.log('subscriptions list', subscriptionsOptionList)
    
            updateSubscriptionOptionRole(subscriptionId, role)
            setUserData(nuserData)
        }
    }

    const addLicense = (optionsList: SubscriptionOption[], subscriptionIndex: number, data: CreateUserFormData) => {
        const subscription = optionsList[subscriptionIndex]

        // console.log('add license', subscription.assignedLicenses, subscription.numberOfLicenses)
        if (canAssignLicense(subscription.assignedLicenses, subscription.numberOfLicenses)) {
            subscription.checked = true
            
            const role = subscription.roles && subscription.roles.length > 0? subscription.roles[0].roleName : ""
            
            const license: CreateUserFormLicensesData = {
                applicationId: subscription.applicationId,
                tenantId: userProfile? userProfile.tenantId : '',
                subscriptionId: subscription.subscriptionId
            }
            
            license.roles = []
            license.roles.push(role)
            subscription.selectedRole = role

            if (props && props.editUserInitialData)
                license.userId = props.editUserInitialData.userId
    
            data.licenses.push(license)
    
            setUserData(data)
            setSubscriptionsOptionList(optionsList)
        }
    }

    const removeLicense = (optionsList: SubscriptionOption[], subscriptionIndex: number, data: CreateUserFormData) => {
        const subscription = optionsList[subscriptionIndex]
        subscription.checked = false

        const licenseIndex = data.licenses.findIndex(license => license.applicationId === subscription.applicationId)

        if (licenseIndex !== -1) {
            data.licenses.splice(licenseIndex, 1)
            setUserData(data)
        }

        setSubscriptionsOptionList(optionsList)
    }

    const onSubscriptionToggle = (applicationId: string, subscriptionId: string) => {
        console.log('subscription toggle', subscriptionId)
        const subscriptionIndex = subscriptionsOptionList.findIndex(option => option.subscriptionId === subscriptionId)

        if (subscriptionIndex !== -1) {
            const nsusbscriptionOptions = subscriptionsOptionList.map(option => ({...option}))
            const nuserData = {...userData}

            if (nsusbscriptionOptions[subscriptionIndex].checked) {
                console.log("options after toggle", nsusbscriptionOptions)
                console.log("user data after toggle", nuserData)
                return removeLicense(nsusbscriptionOptions, subscriptionIndex, nuserData)
            }
            
            addLicense(nsusbscriptionOptions, subscriptionIndex, nuserData)
            console.log("options after toggle", nsusbscriptionOptions)
            console.log("user data after toggle", nuserData)
        }
    }

    const hasLicense = (subscriptionId: string) => {
        if (props && props.editUserInitialData) {
            const index = props.editUserInitialData.licenses.findIndex(license => license.tenantSubscriptionId === subscriptionId)

            return index !== -1 
        }

        return false
    }

    const userLicenseRole = (subscriptionId: string) => {
        if (props && props.editUserInitialData) {
            const license = props.editUserInitialData.licenses.find(license => license.tenantSubscriptionId === subscriptionId)

            if (license) {
                return license.applicationRole[0].role
            }

            return ''
        }

        return ''
    }

    const extractApplicationRoles = (subscription: Subscription): SubscriptionOptionRolesItem[] => {
        if (subscription.applicationRoles && subscription.applicationRoles.length > 0)
            return subscription.applicationRoles.map(role => {
                return { 
                    roleName: role.roleName ?? "",
                    isAvailableForTenant: role.isAvailableForTenants
                }
            })

        return []
    }

    const extractSubscriptionOptions = (subscriptionList: Subscription[]): SubscriptionOption[] => {
        const optionsList: SubscriptionOption[] = subscriptionList.map(subscription => {
            const applicationRoles = extractApplicationRoles(subscription)
            const hasAssignedLicense = props? hasLicense(subscription.subscriptionId) : false

            const option: SubscriptionOption = {
                checked: hasAssignedLicense,
                applicationId: subscription.applicationId,
                subscriptionId: subscription.subscriptionId,
                applicationName: subscription.applicationName,
                numberOfLicenses: subscription.numberOfLicenses,
                assignedLicenses: subscription.assignedLicenses
            }

            if (applicationRoles.length > 0) {
                option.roles = applicationRoles

                if (hasAssignedLicense) 
                    option.selectedRole = userLicenseRole(subscription.subscriptionId)
            }

            return option
        })

        console.log('subscription options', optionsList)

        return optionsList
    }

    const fetchSubscriptionsList = async () => {
        if (auth && auth.user && userProfile && edxAppConfig && adminConfig && mode !== 'Invite Admin') {
            const requestData: GetSubscriptionsListRequest = { pageIndex, pageSize }

            const result = await getSubscriptionsList(adminConfig.actionParams, requestData)

            console.log('subscriptions list data', result)
    
            if (result.type === 'Response') {
                const subscriptionOptions = extractSubscriptionOptions(result.data.data)
                setSubscriptionsOptionList(subscriptionOptions)
            }
        }
    }

    const onSave = async () => {
        setSavingChanges(true)

        if (adminConfig) {
            if (mode === 'Add') {
                if (validFormData(userData)) {
                    const checkRequest: CheckUserEmailRequest = { email: userData.email }
                    const emailStatus = await checkUserEmail(adminConfig.actionParams, checkRequest)
                    
                    console.log('check email result', emailStatus)
                    
                    if (emailStatus.type === 'Response') {
                        const status = emailStatus.data.status

                        if (status === "Unregistered") {
                            console.log('invite user', "user does not exist")
                            await onInvite(adminConfig.actionParams, userData)  
                        }
                        else if (status === "Registered") {
                            console.log('invite user', "user registered in a different tenant")
                            await onInvite(adminConfig.actionParams, userData)        
                        }
                        else {
                            errorToast("The user is already registered in current tenant")
                        }
                    }
                    
                    if (props && props.onAddFinished) props.onAddFinished()
                }
                else setHasTriedSubmit(true)
            }
            else if (mode === 'Invite Admin') {
                if (validFormData(userData)) {
                    const subscriptionsRequestData: GetSubscriptionsListRequest = { pageIndex, pageSize }
                    const subscriptions = await getSubscriptionsList(adminConfig.actionParams, subscriptionsRequestData)
                    
                    console.log('invite admin user subscriptions', subscriptions)
                    if (subscriptions.type === "Response") {
                        const techConsoleSubscription = subscriptions.data.data.find(s => s.applicationName === "Tech Console")
                        const communitySubscription = subscriptions.data.data.find(s => s.applicationName === "Community")

                        if (techConsoleSubscription) {
                            const techConsoleLicenseRequest: CreateUserFormLicensesData = {
                                applicationId: techConsoleSubscription.applicationId,
                                subscriptionId: techConsoleSubscription.subscriptionId,
                                tenantId: adminConfig.actionParams.tenantId 
                            }

                            const role = "AdminConsole.Admin"
                            techConsoleLicenseRequest.roles = []
                            techConsoleLicenseRequest.roles.push(role)

                            userData.licenses.push(techConsoleLicenseRequest)
                        }

                        if (communitySubscription) {
                            const communitySubscriptionRequest: CreateUserFormLicensesData = {
                                applicationId: communitySubscription.applicationId,
                                subscriptionId: communitySubscription.subscriptionId,
                                tenantId: adminConfig.actionParams.tenantId 
                            }

                            const role = "Community.User"
                            communitySubscriptionRequest.roles = []
                            communitySubscriptionRequest.roles.push(role)

                            userData.licenses.push(communitySubscriptionRequest)
                        }

                        console.log("licenses requests", userData.licenses)

                        await onInviteAdmin(adminConfig.actionParams, userData)
                    }
                    else 
                        await onInviteAdmin(adminConfig.actionParams, userData)
                    
                    if (props && props.onAddFinished) props.onAddFinished()
                }
                else setHasTriedSubmit(true)
            }
            else if (mode === 'Edit') {
                if (validFormData(userData)) {
                    if (props && props.editUserInitialData) {
                        await onUpdate(adminConfig.actionParams, userData, props.editUserInitialData.userId)
        
                        if (props.onUpdateFinished) props.onUpdateFinished()
                    }
                }
                else setHasTriedSubmit(true)
            }
            else {
                if (props && props.editUserInitialData) {
                    await onManageSubscriptions(adminConfig.actionParams, props.editUserInitialData, subscriptionsOptionList)
    
                    if (props.onUpdateFinished) props.onUpdateFinished()
                }
            }
            setSavingChanges(false)
        }
    }

    const onSaveUserData = async () => {
        if (!adminConfig) 
            return 

        setSavingChanges(true)

        if (validFormData(userData)) {
            if (props && props.editUserInitialData) {
                await onUpdate(adminConfig.actionParams, userData, props.editUserInitialData.userId)

                if (props.onUpdateFinished) props.onUpdateFinished()
            }
        }

        if (props && props.editUserInitialData && subscriptionsOptionList.length > 0) {
            await onManageSubscriptions(adminConfig.actionParams, props.editUserInitialData, subscriptionsOptionList)

            if (props.onUpdateFinished) props.onUpdateFinished()
        }

        setSavingChanges(false)
    }

    const fetchUserById = async () => {
        if (!adminConfig || !edxAppConfig || !props || !props.editUserInitialData)
            return 

        const baseUri = adminConfig.actionParams.edxApiUrl
        const getUserByIdResponse = await getUserById(adminConfig.actionParams, {
            userId: props.editUserInitialData.userId
        })

        setIsFetchingProfile(false)

        if (getUserByIdResponse.type !== 'Response')
            return 

        setUserProfileById(getUserByIdResponse.data)
    }

    const isImplicit = (applicationId: string): boolean => {
        if (!userProfileById || !adminConfig)
            return false

        const tenant = userProfileById.tenants.find(tenant => tenant.tenantId === adminConfig.actionParams.tenantId)

        if (tenant === undefined)
          return false

        const licenses = (tenant as any).licenses
        if (licenses === undefined)
          return false
    
        const license = licenses.find(license => license.applicationId === applicationId)
        if (license === undefined)
          return false

        if (license.roles === undefined)
          return false

        const licenseRole = license.roles[0]
        if (licenseRole === undefined)
          return false

        return licenseRole.isImplicitlyAssigned === true
      }

    useEffect(() => {
        fetchSubscriptionsList()
    }, [])

    useEffect(() => {
        if (mode === 'Invite') {
            const nuserData = {...userData}

            nuserData.userName = ''

            setUserData(nuserData)
        }
    }, [ mode ])

    useEffect(() => {
        if (mode === 'Manage Subscriptions') {
            fetchUserById()
        }
    }, [ mode ])

    // console.log(userData)

    return {
        userData,
        mode,
        onChangeMode,
        roleOptions,
        subscriptionsOptionList,
        errors,
        hasTriedSubmit,
        isImplicit,
        isFetchingProfile,
        onSave,
        onSaveUserData,
        onToggleIsAdmin,
        onInputChange,
        onSelectApplicationRoleForUser,
        onRoleSelect,
        onSubscriptionToggle,
        savingChanges,
    }
}

export default useCreateUserForm