import { Flex, Link, Text } from "@chakra-ui/react"
import { MdHelpOutline } from "react-icons/md"

interface NeedHelpsLinksProps {
    knowledgeBaseUrl: string 
    supportUrl: string
}

const NeedHelpLinks = ({ knowledgeBaseUrl, supportUrl }: NeedHelpsLinksProps) => {
    return (
        <Flex 
            color='gray.800'
            fontFamily='Open sans'
            fontWeight='400'>
                <MdHelpOutline 
                    color="#1E2D36"
                    fontSize='25px'
                    height='15px'
                    width='15px'
                    aria-hidden="true"
                    focusable='false' />
                <Text ml='5px' color='gray.800'>
                    Need help? Visit our 
                    <Link 
                        href={knowledgeBaseUrl}
                        target='_blank'
                        referrerPolicy="no-referrer"
                        fontWeight='700' 
                        color='blue.500' 
                        mr='2px' 
                        ml='2px'>
                            Knowledge Base 
                    </Link>
                    or 
                    <Link 
                        href={supportUrl}
                        target='_blank'
                        referrerPolicy="no-referrer"
                        fontWeight='700' 
                        color='blue.500' 
                        ml='2px'>
                            submit a support ticket.
                    </Link>
                </Text>
        </Flex>
    )
}

export default NeedHelpLinks