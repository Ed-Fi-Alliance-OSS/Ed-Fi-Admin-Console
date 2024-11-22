import { Text } from '@chakra-ui/react'
import { LicenseType as SType } from '../../../core/Subscription.types'

interface SubscriptionTypeProps {
    type: SType
}

const SubscriptionType = ({ type }: SubscriptionTypeProps) => {
  return (
    <Text
      bg='gray.100'
      borderRadius='4px'
      color='gray.600'
      fontFamily='Archivo Narrow'
      fontWeight='400'
      padding='6px 6px'
      size='md'
      textAlign='center'
      w='50px'
    >
      {`${type[0].toLocaleUpperCase()}${type.substring(1)}`}
    </Text>
  )
}

export default SubscriptionType