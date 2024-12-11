import { Text } from '@chakra-ui/react'

interface SubscriptionDateTextProps {
    date: string 
}

const SubscriptionDateText = ({ date }: SubscriptionDateTextProps) => {
  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      {date}
    </Text>
  )
}

export default SubscriptionDateText