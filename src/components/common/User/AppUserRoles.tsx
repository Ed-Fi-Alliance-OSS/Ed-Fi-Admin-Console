import {
  Flex, Text 
} from '@chakra-ui/react'
import { AppUserRole } from '../../../core/AppUser.types'

interface AppUserRolesProps {
    roles: AppUserRole[]
}

const AppUserRoles = ({ roles }: AppUserRolesProps) => {
  return (
    <Flex flexDir='column'>
      {roles.map((role, index) => 
        <Text
          key={index}
          fontFamily='Open sans'
          fontWeight='400'
          size='md'
        >
          {role === 'Tenant.Admin'? 'District Admin' : 'District User'}
        </Text>)}
    </Flex>
  )
}

export default AppUserRoles