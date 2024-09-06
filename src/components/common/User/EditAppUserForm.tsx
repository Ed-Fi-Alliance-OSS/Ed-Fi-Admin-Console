import EditAppUserFormContent from "./EditAppUserFormContent"
import EditAppUserFormHeader from "./EditAppUserFormHeader"
import ModalForm from "../ModalForm"
import useCreateUserForm from "../../../hooks/adminActions/users/useCreateUserForm"
import { AppUser } from "../../../core/AppUser.types"
import useUserEducationOrganizations from "../../../hooks/adminActions/users/useUserEducationOrganizations"
import { useState } from "react"

interface EditAppUserFormProps {
    selectedUserData: AppUser
    onAfterEdit: () => void
    onClose: () => void
}

const EditAppUserForm = ({ selectedUserData, onClose, onAfterEdit }: EditAppUserFormProps) => {
    const { 
        userData, 
        mode,
        roleOptions,
        subscriptionsOptionList,
        onSaveUserData,
        isImplicit,
        isFetchingProfile,
        errors,
        onChangeMode,
        onInputChange,
        onToggleIsAdmin,
        onRoleSelect,
        onSelectApplicationRoleForUser,
        onSubscriptionToggle,
        savingChanges } = useCreateUserForm({ 
            formMode: 'Edit', 
            editUserInitialData: selectedUserData,  
            onAddFinished: onAfterEdit,
            onUpdateFinished: onClose
        })

    const edorgsHook = useUserEducationOrganizations({ selectedUser: selectedUserData })
    const [ editMode, setEditMode ] = useState<boolean>(false)

    const onChangeEditEdOrgMode = (value: boolean) => setEditMode(value)

    const onUpdateUser = async () => await onSaveUserData()

    return (
        <ModalForm 
            header={<EditAppUserFormHeader 
                isActionDisabled={edorgsHook.showAddItem || editMode}
                isSaving={
                    savingChanges || 
                    edorgsHook.isCreatingUserEducationOrganization || 
                    edorgsHook.isUpdatingUserEducationOrganization || 
                    edorgsHook.isDeletingUserEducationOrganization.deleting }
                onSave={onUpdateUser}
                onClose={onClose} />}
            content={<EditAppUserFormContent 
                userData={userData}
                edOrgHookData={edorgsHook}
                mode={mode}
                isImplicit={isImplicit}
                isFetchingProfile={isFetchingProfile}
                errors={errors}
                roleOptions={roleOptions}
                subscriptionOptionsList={subscriptionsOptionList}
                edOrgEditMode={editMode}
                onUpdateEditEdOrgMode={onChangeEditEdOrgMode}
                onChangeMode={onChangeMode}
                onInputChange={onInputChange}
                onToggleIsAdmin={onToggleIsAdmin}
                onRoleSelect={onRoleSelect}
                onSelectApplicationRoleForUser={onSelectApplicationRoleForUser}
                onSubscriptionToggle={onSubscriptionToggle} />}
            height='auto'
            width="512px"
        />
    )
}

export default EditAppUserForm