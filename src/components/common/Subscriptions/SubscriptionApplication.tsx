import { Button } from '@chakra-ui/react'

interface SubscriptionApplicationProps {
    name: string 
    onEditApplicationSubscription: () => void
}

const SubscriptionApplication = ({ name, onEditApplicationSubscription }: SubscriptionApplicationProps) => {
  return (
    <Button
      onClick={onEditApplicationSubscription}
      cursor='pointer'
      color='blue.600'
      fontFamily='Open sans'
      fontWeight='700'
      size='md'
      minW='auto'>
      {name}
    </Button> 
  )
}

export default SubscriptionApplication