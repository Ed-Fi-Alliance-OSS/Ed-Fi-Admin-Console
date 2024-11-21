import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button, Flex 
} from '@chakra-ui/react'

interface ManageSubscribersControlsProps {
    applicationName: string
    subscriptionId: string 
    onManage: () => void
    onManageSubscribers: (subscriptionId: string) => void
}

const ManageSubscribersControls = ({ applicationName, subscriptionId, onManageSubscribers }: ManageSubscribersControlsProps) => {
  return (
    <Flex
      justifyContent='flex-end'
      w='full'
    >
      <Button 
        borderRadius='4px'
        data-testid={`manage-${applicationName}-btn`}
        minW='39px'
        size='xs'
        variant='primaryBlue600'
        onClick={() => onManageSubscribers(subscriptionId)}
      >
        Manage Licenses
      </Button>

      {false && <Button 
        aria-labelledby={`show-options-${subscriptionId}`}
        borderRadius='0px 4px 4px 0px'
        maxW='24px'
        minW='24px'
        ml='1px'
        size='xs'
        variant='primaryBlue600'
        onClick={() => onManageSubscribers(subscriptionId)}
      >
        <span
          hidden
          id={`show-options-${subscriptionId}`}
        >{`Show ${applicationName} options`}
        </span>

        <ChevronDownIcon 
          aria-hidden="true"
          focusable="false" 
          fontSize='18px'
        />
      </Button>}
    </Flex>
  )
}

export default ManageSubscribersControls