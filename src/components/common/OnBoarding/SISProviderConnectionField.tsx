import { ChangeEvent } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import {
  Button, Flex, FormControl, Text 
} from '@chakra-ui/react'
import { CustomSelect } from '@edfi/admin-console-shared-sdk'
import RefreshBtn from '../RefreshBtn'
import SISProviderConnectionTag from './SISProviderConnectionTag'

type SISProviderConnectionState = 'Awaiting Connection' | 'Connected'

interface SISProviderOption {
    value: string 
    text: string 
}

interface SISProviderConnectionFieldProps {
    id: string
    sisProviderOptions: SISProviderOption[]
    providerFunction?: string
    selectedProvider: string 
    hasSelectedProvider: boolean 
    connectionState: SISProviderConnectionState
    onChangeSISProvider: (e: ChangeEvent<HTMLSelectElement>) => void
    onRemoveProvider: () => void
}

const SISProviderConnectionField = ({ id, providerFunction, sisProviderOptions, selectedProvider, hasSelectedProvider, connectionState, onChangeSISProvider, onRemoveProvider }: SISProviderConnectionFieldProps) => {
  if (!hasSelectedProvider) {
    return (
      <FormControl
        fontFamily='Open sans'
        w='300px'
      >
        <CustomSelect
          id={id}
          options={sisProviderOptions}
          value={selectedProvider}
          onChange={onChangeSISProvider}
        />
      </FormControl> 
    )
  }

  return (
    <Flex>
      <Text
        bg='gray.100'
        borderRadius='4px'
        color='gray.700'
        fontFamily='Archivo Narrow'
        fontWeight='400'
        padding='5px 10px'
        size='sm'
      >
        {`${sisProviderOptions.find(option => option.value === selectedProvider)?.text} ${providerFunction? `(${providerFunction})` : '' }`}

        <Button
          aria-labelledby='close-btn'
          minW='auto'
          variant='simple'
          onClick={onRemoveProvider}
        >
          <span
            hidden
            id="close-btn"
          >Close
          </span>

          <CloseIcon 
            aria-hidden="true" 
            focusable="false"
            fontSize='10px' 
            ml='10px'
          />
        </Button>
      </Text>

      <Flex ml='10px'>
        <SISProviderConnectionTag status={connectionState} />
      </Flex>

      <Flex
        alignItems='center'
        ml='5px'
      >
        <RefreshBtn 
          id="connection-field"
          onAction={() => console.log('refresh provider connection state...')}
        />
      </Flex>
    </Flex>
  )
}

export default SISProviderConnectionField