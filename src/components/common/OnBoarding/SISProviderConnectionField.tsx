// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdClose } from 'react-icons/md'
import {
  Button, Flex, Field, Text
} from '@chakra-ui/react'
import { CustomSelect } from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
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
      <Field.Root
        fontFamily='Poppins'
        w='300px'
      >
        <CustomSelect
          id={id}
          options={sisProviderOptions}
          value={selectedProvider}
          onChange={onChangeSISProvider}
        />
      </Field.Root> 
    )
  }

  return (
    <Flex>
      <Text
        bg='gray.100'
        borderRadius='4px'
        color='gray.700'
        fontFamily='Archivo Narrow'
        fontSize='sm'
        fontWeight='400'
        padding='5px 10px'
      >
        {`${sisProviderOptions.find(option => option.value === selectedProvider)?.text} ${providerFunction? `(${providerFunction})` : '' }`}

        <Button
          aria-labelledby='close-btn'
          minW='auto'
          variant='solid'
          onClick={onRemoveProvider}
        >
          <span
            hidden
            id="close-btn"
          >Close
          </span>

          <span style={{ marginLeft: '10px' }}>
            <MdClose 
              aria-hidden="true" 
              focusable="false"
              fontSize='10px' 
            />
          </span>
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