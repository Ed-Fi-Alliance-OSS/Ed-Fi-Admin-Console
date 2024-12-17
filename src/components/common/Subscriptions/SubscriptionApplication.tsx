import { Button } from '@chakra-ui/react'

interface SubscriptionApplicationProps {
    name: string 
    onEditApplicationSubscription: () => void
}

const SubscriptionApplication = ({ name, onEditApplicationSubscription }: SubscriptionApplicationProps) => {
  return (
    <Button
      color='blue.600'
      cursor='pointer'
      fontFamily='Poppins'
      fontWeight='700'
      minW='auto'
      size='md'
      onClick={onEditApplicationSubscription}
    >
      {name}
    </Button> 
  )
}

export default SubscriptionApplication