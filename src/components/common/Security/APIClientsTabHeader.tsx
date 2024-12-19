import {
  Button, Flex 
} from '@chakra-ui/react'

interface APIClientsTabHeaderProps {
    onAddAPIClient: () => void
}

const APIClientsTabHeader = ({ onAddAPIClient }: APIClientsTabHeaderProps) => {
  return (
    <Flex
      justifyContent='flex-end'
      w='full'
    >
      <Flex
        alignItems='center'
        mt='5px'
      >
        <Button
          minW='5px'
          p='0 25px'
          size='xs'
          variant='secondaryBlue600'
        >
          Refresh List
        </Button>

        <Button
          minW='5px'
          ml='8px'
          p='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onAddAPIClient}
        >
          Add Subscription
        </Button>
      </Flex>
    </Flex>
  )
}

export default APIClientsTabHeader