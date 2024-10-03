import { Button, Flex, FormControl, Select } from "@chakra-ui/react"
import { CustomErrorField, CustomFormLabel } from "@edfi/admin-console-shared-sdk"
import { ChangeEvent } from "react"
import { Organization, StaffClassification } from "../../../core/Tenant.types"
import UserOrganizationsFormSavePopover from "./UserOrganizationsFormSavePopover"

interface UserOrganizationsFormItemProps {
    educationOrganizationName: string 
    staffClassificationDescriptor: string 
    organizationsList: Organization[]
    staffClassificationsList: StaffClassification[]
    isCreatingEducationOrganization: boolean 
    isValidData: () => boolean 
    onSelectEducationOrganizationName: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectStaffClassificationDescriptor: (e: ChangeEvent<HTMLSelectElement>) => void
    onCreateUserOrganization: () => void
    onCancelAdd: () => void
}

const UserOrganizationsFormItem = ({ organizationsList, staffClassificationsList, isValidData, educationOrganizationName, isCreatingEducationOrganization, staffClassificationDescriptor, onSelectEducationOrganizationName, onSelectStaffClassificationDescriptor, onCancelAdd, onCreateUserOrganization }: UserOrganizationsFormItemProps) => {
    return (
        <Flex 
            justifyContent="space-between"
            padding='16px'
            _notFirst={{ borderTop: '2px', borderTopColor: 'gray.300' }}
            bg='#eff4f6'>
                <Flex flexDir='column' w='320px'>
                    <Flex flexDir='column' justifyContent='space-between' w='full'>
                        <FormControl w='full'>
                            <CustomFormLabel
                                htmlFor="educationOrganizationName"
                                text="Organization Name" />
                            <Select
                                id="educationOrganizationName"
                                value={educationOrganizationName}
                                isDisabled={isCreatingEducationOrganization}
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
                                isDisabled={isCreatingEducationOrganization}
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
                    </Flex>
                    {!isValidData() && <CustomErrorField errorMessage="One organization with this id and role already exists" />}
                </Flex>
                <Flex justifyContent='start' alignItems='start' w='auto'>
                    <Button 
                        onClick={onCreateUserOrganization}
                        isLoading={isCreatingEducationOrganization}
                        isDisabled={!isValidData()}
                        size='xs'
                        borderRadius='4px 0px 0px 4px'
                        variant='primaryBlue600'
                        minW='39px'>
                            Save
                    </Button>
                    <UserOrganizationsFormSavePopover onCancelAdd={onCancelAdd} />
                </Flex>
        </Flex>
    )
}

export default UserOrganizationsFormItem