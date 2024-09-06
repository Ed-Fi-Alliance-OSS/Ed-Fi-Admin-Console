import { Flex, Text } from "@chakra-ui/react"
import { AppUserStatus as Status } from "../../../core/AppUser.types"
import { UsersTableMode } from "../../../hooks/adminActions/users/useManageUsersTable"

interface AppUserStatusProps {
    status: Status
    mode: UsersTableMode
}


const AppUserStatus = ({ status, mode }: AppUserStatusProps) => {
    const selectBorderColor = (status: Status) => {
        if (status === 'Active')
            return 'green.400'
        
        return 'orange.400'
    }
    
    const selectTextColor = (status: Status) => {
        console.log('selectTextColor', status)

        if (mode === 'invitations') {
            if (status === "Inactive")
                return 'orange.600'
            if (status === 'Active')
                return "green.800"
        }

        if (mode === 'users' && status === 'Active')
            return 'green.800'
        
        return 'orange.800'
    }

    const selectTextStatus = () => {
        if (mode === 'users')
            return status

        if (mode === 'invitations') {
            if (status === "Inactive")
                return "Invited"

            if (status === 'Active')
                return 'Accepted'
        }
    }

    return (
        <Flex 
            alignItems='center'
            justifyContent='center'
            border='1px'
            borderRadius='4px'
            borderColor={selectBorderColor(status)}
            h='32px'
            w='64px'>
                <Text
                    color={selectTextColor(status)}
                    fontFamily='Archivo Narrow'
                    fontWeight='400'
                    size='md'>
                        { selectTextStatus() }
                </Text>
        </Flex>
    )
}

export default AppUserStatus