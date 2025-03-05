// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button, Popover, PopoverBody, PopoverContent, PopoverTrigger
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'

interface SetUpInstanceControlBtnPopoverProps {
    instance: ODSInstance 
    updatingIsDefault: UpdatingIsDefaultStatus
    onOpenSetUpModal: (instanceId: string) => void
}

const SetUpInstanceControlBtnPopover = ({ instance, updatingIsDefault, onOpenSetUpModal }: SetUpInstanceControlBtnPopoverProps) => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button 
          aria-labelledby={`show-options-${instance.instanceId}`}
          borderRadius='0px 4px 4px 0px'
          isDisabled={updatingIsDefault.loading}
          maxW='24px'
          minW='24px'
          ml='1px'
          padding='0'
          size='xs'
          variant='primaryBlue500'
          onClick={() => null}
        >
          <span
            hidden
            id={`show-options-${instance.instanceId}`}
          >
            Show Instance Options
          </span> 

          <ChevronDownIcon 
            aria-hidden="true"    
            focusable="false" 
            fontSize='18px'
          /> 
        </Button>
      </PopoverTrigger>

      <PopoverContent w='160px'>
        <PopoverBody
          padding='0'
          w='full'
        >
          <Button
            _hover={{ background: 'white' }}
            bg='white'
            borderRadius='4px'
            color='gray.800'
            display='flex'
            fontFamily='Poppins'
            fontWeight='400'
            h='25px'
            isDisabled={updatingIsDefault.loading}
            isLoading={false}
            minW='80px'
            mx='auto'
            size='xs'
            onClick={() => onOpenSetUpModal(instance.instanceId)}
          >
            Set as Default School Year
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default SetUpInstanceControlBtnPopover