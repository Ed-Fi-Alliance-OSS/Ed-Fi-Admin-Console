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
      cursor='pointer'
      onClick={() => onManageSubscribers(subscriptionId)}
      color='blue.600'
      fontFamily='Open sans'
      fontWeight='700'
      size='md'
      minW='auto'>
      {amount}
    </Button>
  )
}

export default SubscriptionLicensesAmount