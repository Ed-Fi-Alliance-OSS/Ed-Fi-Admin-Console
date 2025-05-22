// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdKeyboardArrowDown } from 'react-icons/md'
import {
  Button, Popover, Box
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
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger>
        <Button 
          aria-labelledby={`show-options-${instance.id}`}
          borderRadius='0px 4px 4px 0px'
          disabled={updatingIsDefault.loading}
          maxW='24px'
          minW='24px'
          ml='1px'
          padding='0'
          size='xs'
          variant='solid'
          color='primaryBlue500'
          onClick={() => null}
        >
          <span
            hidden
            id={`show-options-${instance.id}`}
          >
            Show Instance Options
          </span> 

          <MdKeyboardArrowDown 
            aria-hidden="true"    
            focusable="false" 
            fontSize='18px'
          /> 
        </Button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content>
          <Box
            padding='0'
            width='160px'
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
              disabled={updatingIsDefault.loading}
              minW='80px'
              mx='auto'
              size='xs'
              onClick={() => onOpenSetUpModal(instance.id.toString())}
            >
              Set as Default School Year
            </Button>
          </Box>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export default SetUpInstanceControlBtnPopover