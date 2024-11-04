import { Flex, Text } from '@chakra-ui/react'
import { DeletingState } from '../../../core/deletingState.types'
import { Organization, StaffClassification } from '../../../core/Tenant.types'
import { EdOrgViewItem } from '../../../hooks/adminActions/users/useUserEducationOrganizations.types'
import UserOrganizationsFormControlBtn from './UserOrganizationsFormControlBtn'

interface UserOrganizationsCardProps {
    educationOrganization: EdOrgViewItem
    organizationsList: Organization[]
    staffClassificationsList: StaffClassification[]
    isDeleting: DeletingState
    canUseActions: boolean 
    index: number 
    onEdit: (educationOrganizationId: string, staffClassification: string, index: number) => void
    onDelete: (educationOrganizationId: string, staffClassification: string) => void 
    onCancelEdit: () => void
}

const UserOrganizationsCard = ({ educationOrganization, staffClassificationsList, index, isDeleting, canUseActions, onCancelEdit, onDelete, onEdit }: UserOrganizationsCardProps) => {
  const selectStaffClassificationText = () => {
    // console.log('staff classifications list', staffClassificationsList)
    // console.log("ed org staff classification", educationOrganization.staffClassification)

    const staffClassification = staffClassificationsList.find(staffItem => educationOrganization.staffClassification === `${staffItem.varNamespace}#${staffItem.codeValue}`)
        
    if (staffClassification)
      return staffClassification.shortDescription

    return ''
  }

  return (
    <Flex 
      justifyContent="space-between"
      padding='16px'
      alignItems='start'
      _notFirst={{ borderTop: '2px', borderTopColor: 'gray.300' }}>
      <Flex flexDir='column' w='80%'>
        <Text
          fontFamily='Open sans'
          fontSize="14px"
          fontWeight='700'
          color='blue.600'>
          {educationOrganization.nameOfInstitution}
        </Text>
        <Text fontSize='14px'>
          {selectStaffClassificationText()}
        </Text>
        <Text
          color='gray.500'
          fontSize='14px'>
          {educationOrganization.source}
        </Text>
      </Flex>
      <UserOrganizationsFormControlBtn
        educationOrganizationId={educationOrganization.educationOrganizationId as string}
        staffClassification={educationOrganization.staffClassification}
        source={educationOrganization.source}
        mode='add'
        index={index}
        isDisabled={!canUseActions}
        isDeleting={isDeleting}
        onDelete={onDelete}
        onEdit={onEdit} 
        onCancelEdit={onCancelEdit} />
    </Flex>
  )
}

export default UserOrganizationsCard