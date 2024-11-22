import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spinner 
} from '@chakra-ui/react'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'

interface ManageInstanceControlBtnPopoverProps {
    instanceId: string 
    isDefault: boolean 
    canSetAsDefault: boolean
    updatingIsDefault: UpdatingIsDefaultStatus
    onOpenSetDefaultModal: (instanceId: string) => void
}

const ManageInstanceControlBtnPopover = ({ instanceId, isDefault, canSetAsDefault, updatingIsDefault, onOpenSetDefaultModal }: ManageInstanceControlBtnPopoverProps) => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button 
          aria-labelledby={`show-options-${instanceId}`}
          borderRadius='0px 4px 4px 0px'
          isDisabled={updatingIsDefault.loading}
          maxW='24px'
          minW='24px'
          ml='1px'
          padding='0'
          size='xs'
          variant='primaryBlue600'
          onClick={() => null}
        >
          <span
            hidden
            id={`show-options-${instanceId}`}
          >Show Instance Options
          </span> 

          { updatingIsDefault.loading && instanceId == updatingIsDefault.instanceId? 
            <Spinner 
              color='white' 
              size='xs'
            /> 
            :
            <ChevronDownIcon 
              aria-hidden="true"    
              focusable="false" 
              fontSize='18px'
            /> }
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
            fontFamily='Open sans'
            fontWeight='400'
            h='25px'
            isDisabled={updatingIsDefault.loading || isDefault || !canSetAsDefault}
            isLoading={false}
            minW='80px'
            mx='auto'
            size='xs'
            onClick={() => onOpenSetDefaultModal(instanceId)}
          >
            Set as Default School Year
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ManageInstanceControlBtnPopover