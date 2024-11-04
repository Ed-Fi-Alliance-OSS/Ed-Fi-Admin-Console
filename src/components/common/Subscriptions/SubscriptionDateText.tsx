import { Text } from '@chakra-ui/react'

interface SubscriptionDateTextProps {
    date: string 
}

const SubscriptionDateText = ({ date }: SubscriptionDateTextProps) => {
  return (
    <Text
      fontFamily='Open sans'
      fontWeight='400'
      size='md'>
      {date}
    </Text>
  )
}

export default SubscriptionDateText