import {
  Flex, FormControl
} from '@chakra-ui/react'
import {
  CopyTextBtn,
  CustomFormLabel,
  CustomInput
} from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { useTenantContext } from '../../../context/tenantContext'
import { ODSInstance } from '../../../core/ODSInstance.types'

interface ApplicationAPIEndpointsTabContentProps {
    instance: ODSInstance | null
}

const ApplicationAPIEndpointsTabContent = ({ instance }: ApplicationAPIEndpointsTabContentProps) => {
  // const { edfiInfo } = useEdfiUrls()
  const { edfiMetadata } = useTenantContext()
  const adminConfig = useContext(adminConsoleContext)

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <FormControl>
        <CustomFormLabel 
          htmlFor="dataManagementApi" 
          text="Base URL"
        />

        <Flex w='full'>
          <CustomInput
            id="dataManagementApi"
            value={edfiMetadata?.urls ? edfiMetadata.urls.dataManagementApi : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={edfiMetadata?.urls ? edfiMetadata.urls.dataManagementApi : ''} />
          </Flex>
        </Flex>
      </FormControl>

      <FormControl mt={4}>
        <CustomFormLabel 
          htmlFor="authenticationUrl" 
          text="OAuth API URL"
        />

        <Flex w='full'>
          <CustomInput
            id="authenticationUrl"
            value={edfiMetadata?.urls? edfiMetadata.urls.oauth : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={edfiMetadata?.urls? edfiMetadata.urls.oauth : ''} />
          </Flex>
        </Flex>
      </FormControl>

      <Flex
        bg='gray.300'
        h='1px'
        mt='16px'
        w='full'
      />

    </Flex>
  )
}

export default ApplicationAPIEndpointsTabContent