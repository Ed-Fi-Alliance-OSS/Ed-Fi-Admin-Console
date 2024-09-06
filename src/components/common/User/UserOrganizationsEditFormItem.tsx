import { Button, Flex, FormControl, Select } from "@chakra-ui/react"
import { CustomErrorField, CustomFormLabel } from "@edwire/edx-portal-shared"
import { ChangeEvent } from "react"
import { Organization, StaffClassification } from "../../../core/Tenant.types"
import { EdOrgViewItem } from "../../../hooks/adminActions/users/useUserEducationOrganizations.types"
import UserOrganizationsEditPopover from "./UserOrganizationsEditPopover"

interface UserOrganizationsEditFormItemProps {
    edOrgToEdit: EdOrgViewItem
    educationOrganizationName: string 
    staffClassificationDescriptor: string 
    organizationsList: Organization[]
    staffClassificationsList: StaffClassification[]
    isUpdatingEducationOrganization: boolean 
    isValidData: () => boolean
    onSelectEducationOrganizationName: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectStaffClassificationDescriptor: (e: ChangeEvent<HTMLSelectElement>) => void
    onUpdate: (edOrgId: string, staffClassification: string) => void
    onCancel: () => void
}

const UserOrganizationsEditFormItem = ({ organizationsList, staffClassificationsList, edOrgToEdit, isValidData, educationOrganizationName, isUpdatingEducationOrganization, staffClassificationDescriptor, onSelectEducationOrganizationName, onSelectStaffClassificationDescriptor, onUpdate, onCancel }: UserOrganizationsEditFormItemProps) => {
    const isCurrentSelection = () => {
        return edOrgToEdit.educationOrganizationId == educationOrganizationName && edOrgToEdit.staffClassification === staffClassificationDescriptor
    }

    return (
        <Flex 
            justifyContent="space-between"
            padding='16px'
            _notFirst={{ borderTop: '2px', borderTopColor: 'gray.300' }}
            bg='#eff4f6'>
                <Flex 
                    flexDir='column'
                    w='320px'>
                        <FormControl w='full'>
                            <CustomFormLabel
                                htmlFor="educationOrganizationName"
                                text="Organization Name" />
                            <Select
                                value={educationOrganizationName}
                                isDisabled={true}
                                onChange={onSelectEducationOrganizationName}
                                borderRadius='4px'
                                bg='white'
                                size='xs'>
                                    {organizationsList.map((org, index) => 
                                        <option key={index} value={org.identifierValue}>
                                            {org.nameOfInstitution}
                                        </option>    
                                    )}
                            </Select> 
                        </FormControl>
                        <FormControl mt='16px' w='full'>
                            <CustomFormLabel
                                htmlFor="staffClassificationDescriptor"
                                text="Role" />
                            <Select
                                value={staffClassificationDescriptor}
                                isDisabled={isUpdatingEducationOrganization}
                                onChange={onSelectStaffClassificationDescriptor}
                                borderRadius='4px'
                                bg='white'
                                color='black'
                                size='xs'>
                                    {staffClassificationsList.map((staffClassification, index) => 
                                        <option key={index} value={`${staffClassification.varNamespace}#${staffClassification.codeValue}`}>
                                            {staffClassification.shortDescription}
                                        </option>    
                                    )}
                            </Select>
                        </FormControl>
                    {!isValidData() && !isCurrentSelection() && <CustomErrorField errorMessage="One organization with this id and role already exists" />}
                </Flex>
                <Flex justifyContent='start' alignItems='start' w='auto'>
                    <Button 
                        onClick={() => onUpdate(edOrgToEdit.educationOrganizationId as any, edOrgToEdit.staffClassification)}
                        isLoading={isUpdatingEducationOrganization}
                        isDisabled={!isValidData()}
                        size='xs'
                        borderRadius='4px 0px 0px 4px'
                        variant='primaryBlue600'
                        minW='39px'>
                            Save
                    </Button>
                    <UserOrganizationsEditPopover onCancelEdit={onCancel} />
                </Flex>
        </Flex>
    )
}

export default UserOrganizationsEditFormItem