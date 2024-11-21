import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Popover, PopoverTrigger, Button, PopoverContent, PopoverBody, Flex 
} from '@chakra-ui/react'

interface UserOrganizationsFormSavePopoverProps {
    onCancelAdd: () => void
}

const UserOrganizationsFormSavePopover = ({ onCancelAdd }: UserOrganizationsFormSavePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button 
          aria-labelledby="show-save-option}"
          borderRadius='0px 4px 4px 0px'
          maxW='24px'
          minW='24px'
          ml='1px'
          size='xs'
          variant='primaryBlue600'
          onClick={() => console.log('User education organizations control popover')}
        >
          <span
            hidden
            id="show-save-option}"
          >Show Options
          </span>

          <ChevronDownIcon 
            aria-hidden="true"    
            focusable="false" 
            fontSize='18px'
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        padding='0'
        top='0px'
        w='100px'
      >
        <PopoverBody padding='0'>
          <Flex 
            bg='white'
            border='1px'
            borderColor='gray.400'
            borderRadius='4px'
            w='100px'
          >
            <Button
              _hover={{ background: 'white' }}
              bg='white'
              borderRadius='4px'
              color='black'
              display='flex'
              fontFamily='Open sans'
              isLoading={false}
              minW='80px'
              size='xs'
              onClick={onCancelAdd}
            >
              Cancel
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default UserOrganizationsFormSavePopover