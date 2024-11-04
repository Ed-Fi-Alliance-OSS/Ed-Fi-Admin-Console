import { Button, Flex, Tooltip } from '@chakra-ui/react'
import { DeletingState } from '../../../core/deletingState.types'
import UserOrganizationsFormControlPopover from './UserOrganizationsFormControlPopover'

interface UserOrganizationsFormControlBtnProps {
    educationOrganizationId: string
    staffClassification: string
    isDeleting: DeletingState
    mode: 'add' | 'edit'
    source: string 
    isDisabled: boolean 
    index: number 
    onEdit: (educationOrganizationId: string, staffClassification: string, index: number) => void
    onDelete: (educationOrganizationId: string, staffClassification: string) => void 
    onCancelEdit: () => void
}

const UserOrganizationsFormControlBtn = ({ educationOrganizationId, staffClassification, source, isDeleting, isDisabled, index, onEdit, mode, onCancelEdit, onDelete }: UserOrganizationsFormControlBtnProps) => {
  const canModify = () => source === 'Manual'

  return (
    <Flex justifyContent='flex-end' w='auto'>
      <Tooltip isDisabled={canModify()} hasArrow label='Cannot EDIT data from Ed-Fi' bg='blue.600' borderRadius='4px'>
        <Button 
          onClick={() => onEdit(educationOrganizationId, staffClassification, index)}
          isDisabled={!canModify() || isDisabled}
          size='xs'
          borderRadius='4px 0px 0px 4px'
          variant='primaryBlue600'
          minW='39px'>
                        Edit
        </Button>
      </Tooltip>
      <UserOrganizationsFormControlPopover 
        educationOrganizationId={educationOrganizationId} 
        staffClassification={staffClassification}
        isDisabled={isDisabled}
        isDeleting={isDeleting}
        canDelete={canModify()}
        onDelete={onDelete} />
    </Flex>
  )
}

export default UserOrganizationsFormControlBtn