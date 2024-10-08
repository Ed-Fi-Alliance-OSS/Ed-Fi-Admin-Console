import { Flex, FormControl, Text } from "@chakra-ui/react"
import { CustomFormLabel, CustomSwitch } from "@edfi/admin-console-shared-sdk"

interface UserSyncConfigureFormProps {
    isSaving: boolean 
    enabledNightlySync: boolean 
    onToggleNightlySync: () => void
}

const UserSyncConfigureForm = ({ enabledNightlySync, isSaving, onToggleNightlySync }: UserSyncConfigureFormProps) => {
    return (
        <Flex w='full'>      
            <FormControl>
                <CustomFormLabel 
                    htmlFor='enableNightlySync' 
                    text='Enable Nightly Sync' />
                <Text 
                    fontFamily='Open sans' 
                    fontWeight='400'>
                        Synchronize user information on a nightly basis. If this is not enabled, run a manual sync to synchronize users.
                </Text>
                <Flex mt='16px'>
                    <CustomSwitch
                        id="enableNightlySync"
                        isChecked={enabledNightlySync}
                        isDisabled={isSaving}
                        onCheck={onToggleNightlySync} />
                </Flex>
            </FormControl>
        </Flex>
    )
}

export default UserSyncConfigureForm