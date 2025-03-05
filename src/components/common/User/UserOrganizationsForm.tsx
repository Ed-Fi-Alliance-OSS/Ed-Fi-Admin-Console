// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex 
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  EdOrgViewItem, UserEducationOrganizationsHook 
} from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import ConfirmDeleteEdOrgModal from './ConfirmDeleteEdOrgModal'
import ConfirmEditEdOrgModal from './ConfirmEditEdOrgModal'
import UserOrganizationsCard from './UserOrganizationsCard'
import UserOrganizationsEditFormItem from './UserOrganizationsEditFormItem'
import UserOrganizationsFormItem from './UserOrganizationsFormItem'

interface UserOrganizationsFormProps {
    formHookData: UserEducationOrganizationsHook
    editMode: boolean
    onUpdateEditEdOrgMode: (value: boolean) => void
}

const UserOrganizationsForm = ({ formHookData, editMode, onUpdateEditEdOrgMode }: UserOrganizationsFormProps) => {
  const [ selectedViewEdOrg, setselectedViewEdOrg ] = useState<EdOrgViewItem | null>(null)
  const [ showConfirmDeleteEdOrg, setShowConfirmDeleteEdOrg ] = useState(false)
  const [ showConfirmEditEdOrg, setShowConfirmEditEdOrg ] = useState(false)

  const onEditOrg = (edOrgId: string, staffClassificationId: string) => {
    formHookData.onCloseAddItem()
    formHookData.onEditEdOrg(edOrgId, staffClassificationId)

    onUpdateEditEdOrgMode(true)
  }

  const onCancelEditOrg = () => {
    formHookData.onCancelEdit()

    console.log('cancel edit org')
        
    onUpdateEditEdOrgMode(false)
  }

  const findViewEdOrg = (edOrgId: string, staffClassification: string) => {
    const viewEdOrg = formHookData.viewEdOrgsList.find(veorg => {
      return veorg.educationOrganizationId.toString() == edOrgId && veorg.staffClassification === staffClassification
    })

    return viewEdOrg
  }

  const onConfirmEdOrgEdits = (edOrgId: string, staffClassification: string) => {
    console.log('on config edit', edOrgId, formHookData.userEdOrgsList)
    const edOrg = findViewEdOrg(edOrgId, staffClassification)

    if (edOrg) {
      setShowConfirmEditEdOrg(true)
      setselectedViewEdOrg(edOrg)
    }
  }

  const onConfirmDeleteEdOrg = (edOrgId: string, staffClassification: string) => {
    const edOrg = findViewEdOrg(edOrgId, staffClassification)

    if (edOrg) {
      setShowConfirmDeleteEdOrg(true)
      setselectedViewEdOrg(edOrg)
    }
  }   

  const handleDeleteEdOrg = async (edOrgId: string, staffClassification: string) => {
    setShowConfirmDeleteEdOrg(false)
    await formHookData.onDeleteEducationOrganization(edOrgId, staffClassification)
  }

  const handleEditEdOrg = async (edOrgId: string) => {
    setShowConfirmEditEdOrg(false)
    onUpdateEditEdOrgMode(false)
    await formHookData.onUpdateEducationOrganization(edOrgId)
  }

  const isValidData = () => {
    const edOrg = formHookData.viewEdOrgsList.find(item => {
      if (item.educationOrganizationId == formHookData.educationOrganizationName && item.staffClassification === formHookData.staffClassificationDescriptor) {
        return true
      }

      return false
    })

    if (edOrg) {
      return false
    }

    return true
  }

  const canUseActions = () => {
    if (formHookData.showAddItem || editMode || formHookData.isUpdatingUserEducationOrganization) {
      return false
    }

    return true
  }

  const selectItem = (educationOrganization: EdOrgViewItem, key: number) => {
    if (formHookData.edOrgToEdit && formHookData.edOrgToEdit.educationOrganizationId === educationOrganization.educationOrganizationId && formHookData.edOrgToEdit.staffClassification === educationOrganization.staffClassification) {
      return (
        <UserOrganizationsEditFormItem
          key={key}
          edOrgToEdit={formHookData.edOrgToEdit}
          educationOrganizationName={formHookData.educationOrganizationName}
          isUpdatingEducationOrganization={formHookData.isUpdatingUserEducationOrganization}
          isValidData={isValidData}
          organizationsList={formHookData.organizationsList} 
          staffClassificationDescriptor={formHookData.staffClassificationDescriptor}
          staffClassificationsList={formHookData.staffClassificationsList}
          onCancel={onCancelEditOrg}
          onSelectEducationOrganizationName={formHookData.onSelectEducationOrganizationName}
          onSelectStaffClassificationDescriptor={formHookData.onSelectStaffClassificationDescriptor}
          onUpdate={onConfirmEdOrgEdits}
        />
      )
    }

    return (
      <UserOrganizationsCard 
        key={key}
        canUseActions={canUseActions()}
        educationOrganization={educationOrganization}
        index={key}
        isDeleting={formHookData.isDeletingUserEducationOrganization}
        organizationsList={formHookData.organizationsList}
        staffClassificationsList={formHookData.staffClassificationsList}
        onCancelEdit={onCancelEditOrg}
        onDelete={onConfirmDeleteEdOrg}
        onEdit={onEditOrg}
      />
    )
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      {selectedViewEdOrg && <ConfirmDeleteEdOrgModal
        edOrg={selectedViewEdOrg}
        isDeletingEdOrg={formHookData.isDeletingUserEducationOrganization.deleting}
        show={showConfirmDeleteEdOrg}
        onClose={() => setShowConfirmDeleteEdOrg(false)}
        onDeleteEdOrg={() => handleDeleteEdOrg(selectedViewEdOrg.educationOrganizationId.toString(), selectedViewEdOrg.staffClassification)}
      />}

      {selectedViewEdOrg && <ConfirmEditEdOrgModal
        edOrg={selectedViewEdOrg}
        isSavingEdOrg={formHookData.isUpdatingUserEducationOrganization}
        show={showConfirmEditEdOrg}
        onClose={() => setShowConfirmEditEdOrg(false)}
        onEditEdOrg={() => handleEditEdOrg(selectedViewEdOrg.educationOrganizationId.toString())}
      />}

      <Flex
        justifyContent='flex-end'
        w='full'
      >
        <Button
          _disabled={{ 
            opacity: 0.6, 
            cursor: 'default',
            '_hover': { bg: 'blue.900' } 
          }}
          isDisabled={formHookData.showAddItem || formHookData.isUpdatingUserEducationOrganization || editMode}
          variant='primaryBlue600'
          onClick={formHookData.onShowAddItem}
        >
          Add New
        </Button>
      </Flex>

      <Flex 
        border='1px'
        borderColor='gray.300'
        borderRadius='4px'
        flexDir='column'
        mt='16px'
      >
        <>  
          {formHookData.viewEdOrgsList.map((educationOrganization, index) => 
            selectItem(educationOrganization, index))}

          { formHookData.showAddItem && !editMode && <UserOrganizationsFormItem
            educationOrganizationName={formHookData.educationOrganizationName}
            isCreatingEducationOrganization={formHookData.isCreatingUserEducationOrganization}
            isValidData={isValidData}
            organizationsList={formHookData.organizationsList}
            staffClassificationDescriptor={formHookData.staffClassificationDescriptor} 
            staffClassificationsList={formHookData.staffClassificationsList}
            onCancelAdd={formHookData.onCloseAddItem}
            onCreateUserOrganization={formHookData.onSaveEdOrgs}
            onSelectEducationOrganizationName={formHookData.onSelectEducationOrganizationName}
            onSelectStaffClassificationDescriptor={formHookData.onSelectStaffClassificationDescriptor}
          /> }
        </>
      </Flex>

      <Flex
        justifyContent="flex-end"
        mt='16px'
      >
        <Button
          _disabled={{ 
            opacity: 0.6, 
            cursor: 'default',
            '_hover': { bg: 'blue.900' } 
          }}
          isDisabled={formHookData.showAddItem || formHookData.isUpdatingUserEducationOrganization || editMode}
          variant='primaryBlue600'
          onClick={formHookData.onShowAddItem}
        >
          Add New
        </Button>
      </Flex>
    </Flex>
  )
}

export default UserOrganizationsForm