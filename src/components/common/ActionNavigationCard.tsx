import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Flex, Img, Link, Text } from '@chakra-ui/react'
import { useConfig } from '@edfi/admin-console-shared-sdk'
import { Link as RouterLink } from 'react-router-dom'
import { ActionNavigationItem } from '../../core/actionNavigation'
import routes from '../../core/routes'

interface ActionNavigationCardProps {
    data: ActionNavigationItem
    index: number 
}

const ActionNavigationCard = ({ data, index }: ActionNavigationCardProps) => {
  const {config} = useConfig()
  return (
    <Link 
      to={routes.console.url}
      state={{ consoleActionIndex: index }}
      as={RouterLink}
      display='flex'
      justifyContent='flex-start'
      bg='white'
      borderRadius='4px'
      border='1px' 
      borderColor='gray.300'
      flexDir='column'
      padding='15px 14px 0px 14px'
      h='112px'
      w='20%'
      mr='16px'
      _hover={{ borderColor: 'blue.600' }}
      style={{ textDecoration: 'none' }}>
      {typeof(data.icon) === 'string'? 
        <Img 
          src={data.icon}
          h='32px' 
          w='32px'
          alt={data.name} /> : 
        data.icon}
      <Flex mt='5px' color='blue.600'>
        <Text 
          textDecoration='none'
          fontFamily='Poppins' 
          fontWeight='400'
          color='blue.600'
          maxW='180px'>{data.name}</Text>
        <Flex alignItems='center' h='20px'>
          <ArrowForwardIcon 
            ml='10px'
            aria-hidden="true" focusable="false"  />
        </Flex>
      </Flex>
    </Link>
  )
}

export default ActionNavigationCard