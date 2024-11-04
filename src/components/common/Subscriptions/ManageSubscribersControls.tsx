import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'

interface ManageSubscribersControlsProps {
    applicationName: string
    subscriptionId: string 
    onManage: () => void
    onManageSubscribers: (subscriptionId: string) => void
}

const ManageSubscribersControls = ({ applicationName, subscriptionId, onManageSubscribers }: ManageSubscribersControlsProps) => {
  return (
    <Flex justifyContent='flex-end' w='full'>
      <Button 
        onClick={() => onManageSubscribers(subscriptionId)}
        size='xs'
        borderRadius='4px'
        data-testid={`manage-${applicationName}-btn`}
        variant='primaryBlue600'
        minW='39px'>
                    Manage Licenses
      </Button>
      {false && <Button 
        onClick={() => onManageSubscribers(subscriptionId)}
        size='xs'
        borderRadius='0px 4px 4px 0px'
        variant='primaryBlue600'
        ml='1px'
        minW='24px'
        maxW='24px'
        aria-labelledby={`show-options-${subscriptionId}`}>
        <span id={`show-options-${subscriptionId}`} hidden>{`Show ${applicationName} options`}</span>
        <ChevronDownIcon 
          fontSize='18px'
          aria-hidden="true" 
          focusable="false"  />
      </Button>}
    </Flex>
  )
}

export default ManageSubscribersControls