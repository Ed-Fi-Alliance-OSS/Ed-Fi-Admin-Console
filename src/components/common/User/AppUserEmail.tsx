import { Text } from '@chakra-ui/react'

interface AppUserEmailProps {
    email: string 
}

const AppUserEmail = ({ email }: AppUserEmailProps) => {
  const emailText = () => {
    if (email.length <= 20) {
      return email
    }
        
    return  `${email.slice(0, 20)}...`
  }

  return (
    <Text 
      fontFamily='Open sans'
      fontSize='md'
      fontWeight='400'
    >
      {emailText()}
    </Text>
  )
}

export default AppUserEmail