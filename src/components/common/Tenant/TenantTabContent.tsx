import { Flex } from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import TenantSettingsForm from './TenantSettingsForm'

const TenantTabContent = () => {
  return (
    <Flex w='full'>
      <TabHeading text="Tenant Settings" />
      <Flex mt='10px' ml='58px' w='full' maxW='730px'>
        <TenantSettingsForm />
      </Flex>
    </Flex>
  )
}

export default TenantTabContent