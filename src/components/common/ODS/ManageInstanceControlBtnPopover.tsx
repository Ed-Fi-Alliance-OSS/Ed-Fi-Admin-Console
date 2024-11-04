import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spinner } from '@chakra-ui/react'
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
          onClick={() => null}
          isDisabled={updatingIsDefault.loading}
          size='xs'
          borderRadius='0px 4px 4px 0px'
          variant='primaryBlue600'
          ml='1px'
          minW='24px'
          maxW='24px'
          padding='0'
          aria-labelledby={`show-options-${instanceId}`}>
          <span id={`show-options-${instanceId}`} hidden>Show Instance Options</span> 
          { updatingIsDefault.loading && instanceId == updatingIsDefault.instanceId? 
            <Spinner 
              color='white' 
              size='xs' /> 
            :
            <ChevronDownIcon 
              fontSize='18px'    
              aria-hidden="true" 
              focusable="false" /> }
        </Button>
      </PopoverTrigger>
      <PopoverContent w='160px'>
        <PopoverBody padding='0' w='full'>
          <Button
            onClick={() => onOpenSetDefaultModal(instanceId)}
            isDisabled={updatingIsDefault.loading || isDefault || !canSetAsDefault}
            isLoading={false}
            fontFamily='Open sans'
            display='flex'
            bg='white'
            color='gray.800'
            fontWeight='400'
            borderRadius='4px'
            size='xs'
            h='25px'
            mx='auto'
            minW='80px'
            _hover={{ background: 'white' }}>
                            Set as Default School Year
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ManageInstanceControlBtnPopover