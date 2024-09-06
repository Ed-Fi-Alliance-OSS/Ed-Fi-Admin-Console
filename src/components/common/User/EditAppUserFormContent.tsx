import { Flex } from "@chakra-ui/react"
import { Tabs, TabList, Tab, TabIndicator, TabPanel, TabPanels } from "@chakra-ui/react"
import { ChangeEvent, useContext } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { FormDataErrors } from "../../../core/validation/FormValidations.types"
import { CreateUserFormData, RoleOption, SubscriptionOption, UserFormMode } from "../../../hooks/adminActions/users/useCreateUserForm.types"
import { UserEducationOrganizationsHook } from "../../../hooks/adminActions/users/useUserEducationOrganizations.types"
import AppUserDetailsForm from "./AppUserDetailsForm"
import AppUserSubscriptionsForm from "./AppUserSubscriptionsForm"
import UserOrganizationsForm from "./UserOrganizationsForm"

const tabsList = [
    'User Details',
    'Organizations',
    'Licenses'
]

interface EditAppUserFormContentProps {
    mode: UserFormMode
    userData: CreateUserFormData
    edOrgHookData: UserEducationOrganizationsHook
    errors: FormDataErrors
    roleOptions: RoleOption[]
    isImplicit: (applicationId: string) => boolean  
    isFetchingProfile: boolean 
    subscriptionOptionsList: SubscriptionOption[]
    edOrgEditMode: boolean
    onUpdateEditEdOrgMode: (value: boolean) => void
    onChangeMode: (value: string) => void
    onToggleIsAdmin: () => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onRoleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectApplicationRoleForUser: (subscriptionId: string, role: string) => void
    onSubscriptionToggle: (applicationId: string, subscriptionId: string) => void
}

const EditAppUserFormContent = ({ userData, edOrgHookData, mode, isImplicit, isFetchingProfile, errors, roleOptions, subscriptionOptionsList, edOrgEditMode, onUpdateEditEdOrgMode, onChangeMode, onToggleIsAdmin, onInputChange, onRoleSelect, onSelectApplicationRoleForUser, onSubscriptionToggle }: EditAppUserFormContentProps) => {
    const adminConfig = useContext(adminConsoleContext)

    const handleTabChange = (tab: string) => {
        if (tab === 'User Details') 
            return onChangeMode('Edit')

        onChangeMode('Manage Subscriptions')
    }

    const showEdOrgTab = (tab: string) => {
        if (tab === "Organizations") {
            if (adminConfig && adminConfig.showEdOrgsTab)
                return true
            
            return false
        }

        return true
    }

    return (
        <Flex flexDir='column' w='full'>
            <Tabs   
                position="relative" 
                variant="unstyled"
                isFitted
                w='full'>
                    <TabList>
                        {tabsList.filter(tab => showEdOrgTab(tab)).map((tab, index) => 
                            <Tab 
                                onClick={() => handleTabChange(tab)}
                                key={index}
                                fontFamily='Open sans'
                                fontWeight='bold'
                                fontSize='16px'
                                textAlign='center'
                                padding='0'
                                _selected={{ color: 'blue.600' }}
                                _notFirst={{ ml: '32px' }}>{tab}</Tab>
                        )}
                    </TabList>
                    <TabIndicator  
                        mt="5px"
                        height="2px"
                        bg="blue.600"
                        borderRadius="1px" />
                    <TabPanels mt='35px' padding='0'>
                        <TabPanel padding='0'>
                            <AppUserDetailsForm
                                mode={mode}
                                errors={errors}
                                userData={userData}
                                roleOptions={roleOptions}
                                onToggleIsAdmin={onToggleIsAdmin}
                                onInputChange={onInputChange}
                                onSelectChange={onRoleSelect} />
                        </TabPanel>
                        {adminConfig && adminConfig.showEdOrgsTab && <TabPanel padding='0'>
                            <UserOrganizationsForm 
                                formHookData={edOrgHookData}
                                editMode={edOrgEditMode}
                                onUpdateEditEdOrgMode={onUpdateEditEdOrgMode} />
                        </TabPanel>}
                        <TabPanel padding='0'>
                            <AppUserSubscriptionsForm
                                onSelectRoleForUser={onSelectApplicationRoleForUser}
                                isImplicit={isImplicit}
                                isFetchingProfile={isFetchingProfile}
                                subscriptionsList={subscriptionOptionsList}
                                onSubscriptionToggle={onSubscriptionToggle} />
                        </TabPanel>
                    </TabPanels>
            </Tabs>
        </Flex>
    )
}

export default EditAppUserFormContent