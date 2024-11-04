import { Text } from '@chakra-ui/react'

interface AppUserEmailProps {
    email: string 
}

const AppUserEmail = ({ email }: AppUserEmailProps) => {
  const emailText = () => {
    if (email.length <= 20)
      return email
        
    return  `${email.slice(0, 20)}...`
  }

  return (
    <Text 
      fontFamily='Open sans'
      fontWeight='400'
      fontSize='md'>
      {emailText()}
    </Text>
  )
}

export default AppUserEmail