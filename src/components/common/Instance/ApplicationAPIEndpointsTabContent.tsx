import {
  Flex, FormControl, Text 
} from '@chakra-ui/react'
import {
  CustomFormLabel, CopyTextBtn, CustomInput 
} from '@edfi/admin-console-shared-sdk'
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
    <Flex
      flexDir='column'
      w='full'
    >
      <FormControl>
        <CustomFormLabel 
          htmlFor="baseUrl" 
          text="Base URL"
        />

        <Flex w='full'>
          <CustomInput
            id="baseUrl"
            value={instance? instance.baseUrl : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={instance? instance.baseUrl : ''} />
          </Flex>
        </Flex>
      </FormControl>

      <FormControl mt={4}>
        <CustomFormLabel 
          htmlFor="authenticationUrl" 
          text="Authentication URL"
        />

        <Flex w='full'>
          <CustomInput
            id="authenticationUrl"
            value={instance? instance.authenticationUrl : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={instance? instance.authenticationUrl : ''} />
          </Flex>
        </Flex>
      </FormControl>

      <FormControl mt='16px'> 
        <CustomFormLabel 
          htmlFor="resourcePrimaryUrl" 
          text="Primary Resources URL (Read-Write)"
        />

        <Flex w='full'>
          <CustomInput
            id="resourcePrimaryUrl"
            value={instance? instance.resourcesUrl : ''}
            onChange={() => null}
          />

          <Flex ml='8px'>
            <CopyTextBtn value={instance? instance.resourcesUrl : ''} />
          </Flex>
        </Flex>
      </FormControl>

      <Flex
        bg='gray.300'
        h='1px'
        mt='16px'
        w='full'
      />

      { adminConfig && adminConfig.showCompositeUrls && <>
        <Text
          fontFamily='Open sans'
          fontWeight='700'
          mt='16px'
          size='md'
        >
          Composites URLs
        </Text>

        <FormControl mt='16px'> 
          <CustomFormLabel 
            htmlFor="compositePrimaryUrl" 
            text="Primary (Read-Write)"
          />

          <Flex w='full'>
            <CustomInput
              id="compositePrimaryUrl"
              value={edfiInfo? edfiInfo.urls.composites : ''}
              onChange={() => null}
            />

            <Flex ml='8px'>
              <CopyTextBtn value={edfiInfo? edfiInfo.urls.composites : ''} />
            </Flex>
          </Flex>
        </FormControl>

        <FormControl mt='16px'> 
          <CustomFormLabel 
            htmlFor="compositeReplicaUrl" 
            text="Replica (Read-Only)"
          />

          <Flex w='full'>
            <CustomInput
              id="primaryUrl"
              value={edfiInfo? edfiInfo.urls.composites : ''}
              onChange={() => null}
            />

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