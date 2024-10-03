import { Flex, FormControl, List, ListItem, Text } from "@chakra-ui/react"
import { ChangeEvent } from 'react'
import { AppUser } from "../../../core/AppUser.types"
import { CustomFormLabel, CustomSelect } from "@edfi/admin-console-shared-sdk"

interface BulkEditRoleFormContentProps {
    selectedUsersList: AppUser[]
    selectedRole: string
    roleOptions: []
    onSelectUserRole: (e: ChangeEvent<HTMLSelectElement>) => void
}

const BulkEditRoleFormContent = ({ selectedUsersList, selectedRole, onSelectUserRole }: BulkEditRoleFormContentProps) => {
    return (
        <Flex flexDir='column' w='full'>
           <FormControl>
                <CustomFormLabel 
                    text="Selected Users"
                    htmlFor="users" />
                <List ml='10px' w='full'>
                    {selectedUsersList.map(user => 
                        <ListItem
                            border='2px'
                            borderColor='gray.300'
                            borderRadius='4px'
                            padding='5px 5px'
                            w='full'
                            _notFirst={{ mt: '16px' }}>
                                <Text 
                                    color='blue.600'
                                    fontFamily='Open sans'
                                    fontWeight='700'
                                    size='sm'>
                                        {`${user.firstName} ${user.lastName}`}
                                </Text>
                                <Text
                                    color='gray.700'
                                    fontFamily='Open sans'
                                    fontWeight='400'
                                    size='xs'>
                                        {user.email}
                                </Text>
                        </ListItem>
                    )}
                </List>
           </FormControl>
           <FormControl mt='32px'>
                <CustomFormLabel 
                    text="Role for all Users Above" 
                    htmlFor="roles" />
                <CustomSelect
                    id="roles"
                    options={[]}
                    value={selectedRole}
                    onChange={onSelectUserRole} />
           </FormControl>
        </Flex>
    )
}

export default BulkEditRoleFormContent