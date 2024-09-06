import { Flex, Text } from "@chakra-ui/react"
import { EDXToastContent, EDXToastType } from "../../hooks/common/EDXToast.types"

interface EDXToastProps {
    content: EDXToastContent
    type: EDXToastType
}

const EDXToast = ({ content, type }: EDXToastProps) => {
    return (
        <Flex 
            alignItems='center' 
            boxShadow='lg'
            position='absolute'
            top='60px'
            right='16px'
            bg={type === 'Success'? 'green.200' : 'red.100'} 
            minH='66px' 
            minW='400px'>
                <Flex bg={type === 'Success'? "green.500" : 'red.500'} h='full' w='5px' />
                <Flex flexDir='column' padding='16px 12px' w='395px'>    
                    <Text 
                        fontFamily='Poppins'
                        fontWeight='600'
                        lineHeight='20px'
                        size='md'>
                            {type === 'Success'? 'Success' : 'Error'}
                    </Text>
                    {content}
                </Flex>
        </Flex>
    )
}

export default EDXToast