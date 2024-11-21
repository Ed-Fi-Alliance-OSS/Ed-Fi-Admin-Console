import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Flex, Img, Link, Text 
} from '@chakra-ui/react'
import { useConfig } from '@edfi/admin-console-shared-sdk'
import { Link as RouterLink } from 'react-router-dom'
import { ActionNavigationItem } from '../../core/actionNavigation'
import routes from '../../core/routes'

interface ActionNavigationCardProps {
    data: ActionNavigationItem
    index: number 
}

const ActionNavigationCard = ({ data, index }: ActionNavigationCardProps) => {
  const { config } = useConfig()
  return (
    <Link 
      _hover={{ borderColor: 'blue.600' }}
      as={RouterLink}
      bg='white'
      border='1px'
      borderColor='gray.300'
      borderRadius='4px'
      display='flex'
      flexDir='column' 
      h='112px'
      justifyContent='flex-start'
      mr='16px'
      padding='15px 14px 0px 14px'
      state={{ consoleActionIndex: index }}
      style={{ textDecoration: 'none' }}
      to={routes.console.url}
      w='20%'
    >
      {typeof(data.icon) === 'string'? 
        <Img 
          alt={data.name}
          h='32px' 
          src={data.icon}
          w='32px'
        /> : 
        data.icon}

      <Flex
        color='blue.600'
        mt='5px'
      >
        <Text 
          color='blue.600'
          fontFamily='Poppins' 
          fontWeight='400'
          maxW='180px'
          textDecoration='none'
        >{data.name}
        </Text>

        <Flex
          alignItems='center'
          h='20px'
        >
          <ArrowForwardIcon 
            aria-hidden="true"
            focusable="false"
            ml='10px'
          />
        </Flex>
      </Flex>
    </Link>
  )
}

export default ActionNavigationCard