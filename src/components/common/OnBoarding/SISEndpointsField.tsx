import { ChangeEvent } from 'react'
import { Flex, FormControl } from '@chakra-ui/react'
import { CustomFormLabel, CopyTextBtn, CustomInput } from '@edfi/admin-console-shared-sdk'

interface SISEndpointsFieldProps {
    edfiAuthtenticationUrl: string 
    edfiResourcesUrl: string 
    onChangeEndpoints: (e: ChangeEvent<HTMLInputElement>) => void
}

const SISEndpointsField = ({ edfiAuthtenticationUrl, edfiResourcesUrl, onChangeEndpoints }: SISEndpointsFieldProps) => {
  return (
    <Flex flexDir='column' mt='10px'>
      <FormControl>   
        <CustomFormLabel
          htmlFor="authenticationUrl"
          text="Ed-Fi Authentication URL" />
        <Flex justifyContent='space-between'>
          <CustomInput
            id="authenticationUrl"
            value={edfiAuthtenticationUrl}
            onChange={onChangeEndpoints} />
          <Flex ml='10px'>
            <CopyTextBtn withoutBorder={true} value={edfiAuthtenticationUrl} />
          </Flex>
        </Flex>
      </FormControl>
      <FormControl mt='16px'>
        <CustomFormLabel
          htmlFor="resourcesUrl"
          text="Ed-Fi Resources URL" />
        <Flex justifyContent='space-between'>
          <CustomInput
            id="resourcesUrl"
            value={edfiResourcesUrl}
            onChange={onChangeEndpoints} />
          <Flex ml='10px'>
            <CopyTextBtn withoutBorder={true} value={edfiResourcesUrl} />
          </Flex>
        </Flex>
      </FormControl>
    </Flex>
  )
}

export default SISEndpointsField