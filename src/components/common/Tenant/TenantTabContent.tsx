import { Flex } from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import TenantSettingsForm from './TenantSettingsForm'

const TenantTabContent = () => {
  return (
    <Flex w='full'>
      <TabHeading text="Tenant Settings" />

      <Flex
        maxW='730px'
        ml='58px'
        mt='10px'
        w='full'
      >
        <TenantSettingsForm />
      </Flex>
    </Flex>
  )
}

export default TenantTabContent