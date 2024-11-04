import { Flex, FormControl, Text } from '@chakra-ui/react'
import { CustomFormLabel, CopyTextBtn, CustomInput } from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import useEdfiUrls from '../../../hooks/useEdfiUrls'
import { ODSInstance } from '../../../core/ODSInstance.types'

interface ApplicationAPIEndpointsTabContentProps {
    instance: ODSInstance | null
}

const ApplicationAPIEndpointsTabContent = ({ instance }: ApplicationAPIEndpointsTabContentProps) => {
  const { edfiInfo } = useEdfiUrls()
  const adminConfig = useContext(adminConsoleContext)

  return (
    <Flex flexDir='column' w='full'>
      <FormControl>
        <CustomFormLabel 
          text="Authentication URL" 
          htmlFor="authenticationUrl" />
        <Flex w='full'>
          <CustomInput
            id="authenticationUrl"
            value={instance? instance.authenticationUrl : ''}
            onChange={() => null} />
          <Flex ml='8px'>
            <CopyTextBtn value={instance? instance.authenticationUrl : ''} />
          </Flex>
        </Flex>
      </FormControl>
      <FormControl mt='16px'> 
        <CustomFormLabel 
          text="Primary Resources URL (Read-Write)" 
          htmlFor="resourcePrimaryUrl" />
        <Flex w='full'>
          <CustomInput
            id="resourcePrimaryUrl"
            value={instance? instance.resourcesUrl : ''}
            onChange={() => null} />
          <Flex ml='8px'>
            <CopyTextBtn value={instance? instance.resourcesUrl : ''} />
          </Flex>
        </Flex>
      </FormControl>
      <Flex bg='gray.300' h='1px' w='full' mt='16px' />
      { adminConfig && adminConfig.showCompositeUrls && <>
        <Text
          fontFamily='Open sans'
          fontWeight='700'
          size='md'
          mt='16px'>
                        Composites URLs
        </Text>
        <FormControl mt='16px'> 
          <CustomFormLabel 
            text="Primary (Read-Write)" 
            htmlFor="compositePrimaryUrl" />
          <Flex w='full'>
            <CustomInput
              id="compositePrimaryUrl"
              value={edfiInfo? edfiInfo.urls.composites : ''}
              onChange={() => null} />
            <Flex ml='8px'>
              <CopyTextBtn value={edfiInfo? edfiInfo.urls.composites : ''} />
            </Flex>
          </Flex>
        </FormControl>
        <FormControl mt='16px'> 
          <CustomFormLabel 
            text="Replica (Read-Only)" 
            htmlFor="compositeReplicaUrl" />
          <Flex w='full'>
            <CustomInput
              id="primaryUrl"
              value={edfiInfo? edfiInfo.urls.composites : ''}
              onChange={() => null} />
            <Flex ml='8px'>
              <CopyTextBtn value={edfiInfo? edfiInfo.urls.composites : ''} />
            </Flex>
          </Flex>
        </FormControl>
      </> }
    </Flex>
  )
}

export default ApplicationAPIEndpointsTabContent