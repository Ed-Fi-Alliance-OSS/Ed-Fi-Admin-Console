import { Link, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

interface BackToLinkProps {
    url: string 
    text: string 
}

const BackToLink = ({ url, text }: BackToLinkProps) => {
  return (
    <Link 
      display='flex' 
      alignItems='center'
      as={RouterLink} 
      to={url}
      w='230px'>
      <ArrowBackIcon 
        color='gray.700' 
        role="img" 
        focusable="true" 
        aria-describedby={`${text}`}
        aria-hidden="true" />
      <Text
        color='gray.700'
        fontFamily='Open sans'
        fontWeight='400'
        size='sm'
        ml='10px'>{text}</Text>
    </Link>
  )
}

export default BackToLink