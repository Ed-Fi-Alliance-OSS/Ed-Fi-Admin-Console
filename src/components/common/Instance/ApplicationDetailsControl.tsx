import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger 
} from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'

interface ApplicationDetailsControlProps {
    data: EdfiApplication
    isDeleting: boolean 
    onDelete: (applicationId: string) => void
}

const ApplicationDetailsControl = ({ data, isDeleting, onDelete }: ApplicationDetailsControlProps) => {
  const adminConfig = useContext(adminConsoleContext)

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          aria-labelledby={`show-options-${data.applicationName}`}
          borderRadius='0px 4px 4px 0px'
          minW='24px'
          ml='1px'
          size='xs'
          variant='primaryBlue600'
        >
          <span
            hidden
            id={`show-options-${data.applicationName}`}
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
        aria-label={`options-${data.applicationName}`}
        padding='0'
        top='0px'
        w='100px'
      >
        <PopoverBody padding='0'>
          <Flex>
            { adminConfig && adminConfig.showEdfiApplicationDelete && <Button
              _hover={{ background: 'red.600' }}
              bg='red.600'
              borderRadius='4px'
              color='white'
              display='flex'
              isLoading={isDeleting}
              justifyContent='center'
              size='xs'
              w='100px'
              onClick={() => onDelete(data.applicationId.toString())}
            >
              Delete
            </Button> }
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ApplicationDetailsControl