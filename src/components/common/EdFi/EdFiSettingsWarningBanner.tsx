import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { CloseIcon, InfoIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import useHelpLinks from '../../../hooks/useHelpLinks'

const EdFiSettingsWarningBanner = () => {
  const [show, setShow] = useState(true)
  const { getAdminActionHelpLinks } = useHelpLinks()

  return (
    <>
      { show && <Flex 
        alignItems='flex-start'
        flexDir='column'
        bg='orange.100'
        mt='16px'
        p='10px 12px'
        w='90%'>
        <Flex mt='3px' w='full'>
          <Flex alignItems='center'>
            <InfoIcon 
              color='orange.500' />
            <Text
              color='gray.800' 
              fontFamily='Open sans' 
              fontSize='16px'
              fontWeight='700'
              ml='16px'>
                                    LIMITED FUNCTIONALITY
            </Text>
          </Flex>
          <Flex ml='auto'>
            <Button minW='auto'>
              <CloseIcon 
                onClick={() => setShow(false)}
                fontSize='12px' />
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir='column' mt='6px' ml='16px' w='80%'>
          <Text 
            color='gray.800' 
            fontFamily='Open sans' 
            fontSize='14px'
            ml='16px'>
                                Note: The functionality below is limited due to the use of an externally-hosted ODS. 
                                To enable functionality and/or learn more, 
                                visit our 
            <Link 
              href={getAdminActionHelpLinks().knowledgeBaseUrl}
              target='_blank'
              referrerPolicy="no-referrer"
              fontWeight='700'  
              mr='2px' 
              ml='2px'>
                                        Knowledge Base 
            </Link>
                                 or 
            <Link 
              href={getAdminActionHelpLinks().supportTicketUrl}
              target='_blank'
              referrerPolicy="no-referrer"
              fontWeight='700' 
              ml='2px'>
                                        submit a support ticket
            </Link>.
          </Text>
        </Flex>
      </Flex> }
    </>
  )
}

export default EdFiSettingsWarningBanner