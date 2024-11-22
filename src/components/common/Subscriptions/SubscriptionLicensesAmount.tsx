import { Button } from '@chakra-ui/react'
import { SubscriptionAmount } from '../../../core/Subscription.types'

interface SubscriptionLicensesAmountProps {
    amount: SubscriptionAmount
    subscriptionId: string 
    onManageSubscribers: (subscriptionId: string) => void
}

const SubscriptionLicensesAmount = ({ subscriptionId, amount, onManageSubscribers }: SubscriptionLicensesAmountProps) => {
  return (
    <Button
      color='blue.600'
      cursor='pointer'
      fontFamily='Open sans'
      fontWeight='700'
      minW='auto'
      size='md'
      onClick={() => onManageSubscribers(subscriptionId)}
    >
      {amount}
    </Button>
  )
}

export default SubscriptionLicensesAmount