import { TEEAuthDataContext, UserProfileContext } from "@edfi/admin-console-shared-sdk";
import { createContext, useContext } from "react";
import { ActionParams, EdfiActionParams } from "../services/AdminActions/adminAction.types";

export interface AdminConsoleConfig {
    actionParams: ActionParams
    edfiActionParams: EdfiActionParams
    showDataHealth: boolean
    showAdvancedTabs: boolean
    edfiEndpoint: string
    allowDebug: boolean
    showCompositeUrls: boolean
    showUserDelete: boolean,
    showEdfiPartnerDelete: boolean,
    showEdfiApplicationDelete: boolean
    showEdOrgsTab: boolean
    useDataHealthWithSchoolYear: boolean
}

export const adminConsoleContext = createContext<AdminConsoleConfig | null>(null)

interface AdminConsoleConfigProviderProps {
    children: JSX.Element
    config: any
}

const AdminConsoleConfigProvider = ({ children, config }: AdminConsoleConfigProviderProps) => {
    const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
    const { userProfile } = useContext(UserProfileContext)

    const getActionParams = (): ActionParams | null => {
        if (auth && auth.user && userProfile && edxAppConfig) {
            return {
                tenantId: userProfile.tenantId,
                token: auth.user.access_token,
                config: edxAppConfig,
                edxApiUrl: config.api.edxApiUri
            }
        }

        return null
    }

    const getEdfiActionParams = (): EdfiActionParams | null => {
        if (auth && auth.user && userProfile && edxAppConfig) {
            return {
                token: auth.user.access_token,
                config: edxAppConfig,
                edxApiUrl: config.api.edxApiUri,
                tenantId: userProfile.tenantId
            }
        }

        return null
    }

    const getEdfiUrl = () => config.app.odsApiInstance ?? ""
    const getShowCompositeUrls = () => config.app.showCompositeUrls? config.app.showCompositeUrls : false
    const getShowDataHealth = () => config.app.showDataHealth? config.app.showDataHealth : false
    const getShowAdvancedTabs = () => config.app.showAdvancedTabs? config.app.showAdvancedTabs : false
    const getAllowDebug = () => config.app.allowDebug? config.app.allowDebug : false
    const getUseDataHealthWithSchoolYear = () => config.app.useDataHealthWithSchoolYear? config.app.useDataHealthWithSchoolYear : false

    const getShowUserDelete = () => config.app.showUserDelete? config.app.showUserDelete : false
    const getShowEdfiPartnerDelete = () => config.app.showEdfiPartnerDelete? config.app.showEdfiPartnerDelete : false
    const getShowEdfiApplicationDelete = () => config.app.showEdfiApplicationDelete? config.app.showEdfiApplicationDelete : false
    const getShowEdOrgsTab = () => config.app.showEdOrgsTab? config.app.showEdOrgsTab : false

    const getAdminConsoleConfig = (): AdminConsoleConfig | null => {
        const actionParams = getActionParams()
        const edfiActionParams = getEdfiActionParams()
        const showDataHealth = getShowDataHealth()
        const showAdvancedTabs = getShowAdvancedTabs()
        const allowDebug = getAllowDebug()
        const showUserDelete = getShowUserDelete()
        const showEdfiPartnerDelete = getShowEdfiPartnerDelete()
        const showEdfiApplicationDelete = getShowEdfiApplicationDelete()
        const showEdOrgsTab = getShowEdOrgsTab()
        const useDataHealthWithSchoolYear = getUseDataHealthWithSchoolYear()

        if (actionParams && edfiActionParams)
            return { 
                actionParams, 
                edfiActionParams, 
                showDataHealth, 
                allowDebug, 
                showAdvancedTabs,
                edfiEndpoint: getEdfiUrl(),
                showCompositeUrls: getShowCompositeUrls(),
                showUserDelete,
                showEdfiApplicationDelete,
                showEdfiPartnerDelete,
                showEdOrgsTab,
                useDataHealthWithSchoolYear
            }

        return null
    }

    return (
        <adminConsoleContext.Provider value={getAdminConsoleConfig()}>
            {children}
        </adminConsoleContext.Provider>
    )
}

export default AdminConsoleConfigProvider