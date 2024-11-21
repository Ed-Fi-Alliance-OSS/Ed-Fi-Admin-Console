import {
  Link, Text 
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

interface BackToLinkProps {
    url: string 
    text: string 
}

const BackToLink = ({ url, text }: BackToLinkProps) => {
  return (
    <Link 
      alignItems='center' 
      as={RouterLink}
      display='flex' 
      to={url}
      w='230px'
    >
      <ArrowBackIcon 
        aria-describedby={`${text}`} 
        aria-hidden="true" 
        color='gray.700' 
        focusable="true"
        role="img"
      />

      <Text
        color='gray.700'
        fontFamily='Open sans'
        fontWeight='400'
        ml='10px'
        size='sm'
      >{text}
      </Text>
    </Link>
  )
}

export default BackToLink