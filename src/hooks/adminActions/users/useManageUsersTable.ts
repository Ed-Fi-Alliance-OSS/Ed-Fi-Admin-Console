import { HttpServiceRequestError, HttpServiceResponse } from "@edfi/admin-console-shared-sdk/dist/services/HttpService/HttpService.response.types"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { AppUser, AppUserLicense, AppUserLicenseRole } from "../../../core/AppUser.types"
import { ControlTableFilter, DataFetchParams } from "../../../core/controlTable"
import { Invitation } from "../../../core/invitations/Invitation.types"
import { ActionParams } from "../../../services/AdminActions/adminAction.types"
import adminActionRoutes from '../../../services/AdminActions/tenantActionRoutes'
import UsersResponseMapper from "../../../services/AdminActions/Users/UsersResponseMapper"
import useUserService from "../../../services/AdminActions/Users/UsersService"
import { GetInvitationsListRequest, GetUsersListRequest } from "../../../services/AdminActions/Users/UsersService.requests"
import { ApiInvitation, GetInvitationsListResponse } from "../../../services/AdminActions/Users/UsersService.responses"
import useEDXToast from "../../common/useEDXToast"
import useControlTable from "../../controlTable/useControlTable" 
import useHttpService from "../../http/useHttpService"
import useDebounce from "../../useDebounce"

export type UsersTableMode = "users" | "invitations"

type UserDataFilters = "firstName" | "lastName" | "status" | "email" | "select filter"

const filterOptionsList: UserDataFilters[] = [
    "select filter",
    "firstName",
    "lastName",
    "email",
    "status"
]

const useManageUsersTable = () => {
    const adminConfig = useContext(adminConsoleContext)
    const [ mode, setMode ] = useState<UsersTableMode>("users")
    const { getUsersList } = useUserService()
    const {
        filterBy,
        setFilterBy,
        orderBy,
        initialPaginatedData,
        paginatedData,
        minPerPage,
        maxPerPage,
        totalPages,
        setPaginatedData,
        isFetchingData,
        setIsFetchingData,
        onChangeFilterValue,
        onDecrementPageSize,
        onIncrementPageSize,
        onChangePageSize,
        onSelectFilter,
        onSortAsc,
        onSortDesc,
        canNextPage,
        canPreviousPage,
        goToInitialPage,
        goToNextPage,
        goToPreviousPage,
        gotToLastPage
    } = useControlTable<AppUser, UserDataFilters>({ initialOrder: "firstName" })
    const { errorToast } = useEDXToast()

    const { getAsync } = useHttpService()
    const [invitationsList, setInvitationsList] = useState<ApiInvitation[]>([])

    const inputTimeoutMiliseconds = 1000
    const debouncedPaginatedData = useDebounce(paginatedData, inputTimeoutMiliseconds)

    const getInvitationsList = async (actionParams: ActionParams, data: GetInvitationsListRequest): Promise<HttpServiceResponse<GetInvitationsListResponse> | HttpServiceRequestError> => {
        const { pageIndex, pageSize, orderBy, filter } = data
    
        const baseUrl = actionParams.edxApiUrl
        let queryParams = `pageIndex=${pageIndex}&pageSize=${pageSize}&orderBy=${orderBy}`
    
        console.log('filter1', filter)
        if (filter)
            queryParams = `${queryParams}&filter=${filter}`
    
        const url = `${baseUrl}/${adminActionRoutes.getInvitationsList(actionParams.tenantId)}?${queryParams}`
        
        const result = await getAsync<GetInvitationsListResponse>({ 
            actionName: "Get Invitations List",
            access_token: actionParams.token,
            url,
            apiConfig: actionParams.config.api
        })
    
        return result
    }

    // .filter(item => mapInvitationStatus(item.invitationStatus) === 'Sent')
    const mapInvitationsToAppUsers = (apiInvitations: ApiInvitation[]): AppUser[] => {
        const users: AppUser[] = apiInvitations.map(apiInvitation => {
            const invitation: Invitation = {
                tenantId: apiInvitation.tenantId,
                invitationId: apiInvitation.invitationId,
                firstName: apiInvitation.firstName,
                lastName: apiInvitation.lastName,
                email: apiInvitation.email,
                role: apiInvitation.role,
                invitationStatus: UsersResponseMapper.mapInvitationStatus(apiInvitation.invitationStatus),
                invitationToken: apiInvitation.invitationToken,
                invitationSendDateTime: apiInvitation.invitationSendDateTime,
                assignLicenseRequests: apiInvitation.assignLicenseRequests
            }
    
            let userLicenses: AppUserLicense[] = []

            if (invitation.assignLicenseRequests.length > 0) {
                userLicenses = invitation.assignLicenseRequests.map(request => {
                    const license: AppUserLicense = {
                        subscriptionTenantId: request.tenantId,
                        isTenantSubscribed: false,
                        tenantSubscriptionId: "",
                        tenantSubscriptionStartDateTime: "",
                        tenantSubscriptionEndDateTime: "",
                        tenantSubscriptionActualEndDateTime: "",
                        numberOfLicenses: 0,
                        assignedLicenses: 0,
                        isUserLicensed: false,
                        applicationTenantId: request.tenantId,
                        applicationId: request.applicationId,
                        applicationName: "",
                        applicationRole: request.roles.map(role => {
                            const appLicenseRole: AppUserLicenseRole = {
                                role: role,
                                isAssigned: true
                            }

                            return appLicenseRole
                        })
                    }

                    return license
                })
            }

            const user: AppUser = {
                firstName: invitation.firstName,
                lastName: invitation.lastName,
                email: invitation.email, 
                userId: invitation.invitationId,
                userName: "",
                status: invitation.invitationStatus === "Accepted"? "Active" : "Inactive",
                licenses: userLicenses,
                roles: [ invitation.role as any ],
                source: 'Manual',
                updated: ""
            }
    
            return user
        })

        return users
    }

    const fetchMappedInvitations = async (pageIndex: number, pageSize: number, filter: ControlTableFilter<UserDataFilters> | null) => {
        if (adminConfig) {
            setIsFetchingData(true)

            const requestData: GetInvitationsListRequest = {
                pageIndex,
                pageSize,
                orderBy: orderBy? `${orderBy.field}+${orderBy.order}` : ""
            }

            if (filter)
                requestData.filter = generateFilterString(filter)

            const result = await getInvitationsList(adminConfig.actionParams, requestData)
            setIsFetchingData(false)

            if (result.type === 'Error')
                errorToast("Could not filter list. Select a filter and try again.")
            else {
                console.log('invitations list received', result.data)

                setInvitationsList(result.data.data.map(apiInvitation => ({...apiInvitation})))                

                setPaginatedData({
                    count: result.data.count,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    data: mapInvitationsToAppUsers(result.data.data)
                })
            }
        }
    }

    const onChangeMode = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedMode: UsersTableMode = e.target.value as any
        setMode(selectedMode)

        setPaginatedData({
            pageIndex: 0, 
            pageSize: paginatedData.pageSize,
            count: 0,
            data: []  
        })

        if (selectedMode === 'invitations')
            return await fetchMappedInvitations(0, paginatedData.pageSize, null)
        
        await fetchUsersList({
            pageIndex: 0, 
            pageSize: paginatedData.pageSize,
            orderBy,
            filterBy
        })
    }

    const onFilter = async () => {
        console.log('filter by', filterBy)

        if (filterBy) {
            console.log('filter')
            const filterValue = filterBy.value.toLocaleLowerCase()

            if (filterBy.field !== 'status') {
                return await fetchUsersListOrInvitationsList({ 
                    pageIndex: 0,
                    pageSize: paginatedData.pageSize,
                    orderBy,
                    filterBy
                })
            }

            if (filterBy.field === 'status' && (filterValue === "active" || filterValue === "inactive" || filterValue === 'unknown')) {
                return await fetchUsersListOrInvitationsList({ 
                    pageIndex: 0,
                    pageSize: paginatedData.pageSize,
                    orderBy,
                    filterBy
                })
            }

            setPaginatedData({
                count: paginatedData.count,
                pageIndex: paginatedData.pageIndex,
                pageSize: paginatedData.pageSize,
                data: []
            })
        }
    }

    const onResetFilter = async () => {
        setFilterBy(null)

        await fetchUsersListOrInvitationsList({ 
            pageIndex: initialPaginatedData.pageIndex,
            pageSize: initialPaginatedData.pageSize,
            orderBy,
            filterBy: null
        })
    }

    const selectFilterStringStatus = (value: string) => {
        if (value === "active")
            return "Active"
        
        if (value === "inactive")
            return "Inactive"

        return "Unknown"
    }

    const generateFilterString = ({ field, value }: ControlTableFilter<UserDataFilters>) => {
        if (field === 'status') {
            const status = selectFilterStringStatus(value.toLocaleLowerCase())

            return `tenants.any(tenantId = "${adminConfig?.actionParams.tenantId}" %26%26 status = "${status}")`
        }

        return `${field}.toLower().contains("${encodeURIComponent(value)}".toLower())`

    }

    const fetchUsersList = async ({ pageIndex, pageSize, orderBy, filterBy }: DataFetchParams<UserDataFilters>) => {
        if (adminConfig) {
            setIsFetchingData(true)

            const requestData: GetUsersListRequest = {
                pageIndex,
                pageSize,
                orderBy: orderBy? `${orderBy.field}+${orderBy.order}` : ""
            }

            if (filterBy)
                requestData.filter = generateFilterString(filterBy)

            const result = await getUsersList(adminConfig.actionParams, requestData)
            setIsFetchingData(false)

            if (result.type === 'Error')
                errorToast("Could not filter list. Select a filter and try again.")
            else {
                // console.log('users list received', result.data.data)

                setPaginatedData({
                    count: result.data.count,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    data: result.data.data
                })
            }
        }
    }

    const fetchUsersListOrInvitationsList = async ({ pageIndex, pageSize, orderBy, filterBy }: DataFetchParams<UserDataFilters>) => {
        if(mode === 'invitations')
            return await fetchMappedInvitations(pageIndex, pageSize, filterBy)

        return await fetchUsersList({ 
            pageIndex: pageIndex,
            pageSize: pageSize,
            orderBy,
            filterBy
        })
    }

    const onRefreshUserList = async () => {
        return await fetchUsersListOrInvitationsList({
            pageIndex: paginatedData.pageIndex,
            pageSize: paginatedData.pageSize,
            orderBy,
            filterBy: null
        })
    }

    useEffect(() => {
        if (mode === 'users') {
            fetchUsersList({
                pageIndex: paginatedData.pageIndex,
                pageSize: paginatedData.pageSize,
                orderBy,
                filterBy
            })
        }
        else {
            fetchMappedInvitations(paginatedData.pageIndex, paginatedData.pageSize, filterBy)
        }
    }, [ debouncedPaginatedData.pageIndex, debouncedPaginatedData.pageSize, orderBy ])

    return {
        paginatedData,
        mode,
        onChangeMode,
        filterOptionsList,
        isFetchingData,
        invitationsList,
        orderBy,
        filterBy,
        onFilter,
        onResetFilter,
        onChangeFilterValue,
        onSelectFilter,
        onRefreshUserList,
        onSortAsc,
        onSortDesc,
        minPerPage,
        maxPerPage,
        goToInitialPage,
        goToPreviousPage,
        goToNextPage,
        gotToLastPage,
        canNextPage,
        canPreviousPage,
        onIncrementPageSize,
        onDecrementPageSize,
        onChangePageSize,
        totalPages
    }
}

export default useManageUsersTable