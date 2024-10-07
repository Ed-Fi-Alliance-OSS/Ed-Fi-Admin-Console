import { Flex } from "@chakra-ui/react"
import { EDXErrorPage } from "@edfi/admin-console-shared-sdk"

interface ErrorPageContainerProps {
    status: '404' | '403' | '500'
}

const ErrorPageContainer = ({ status }: ErrorPageContainerProps) => {
    return (
        <Flex 
            position='relative'
            overflow='hidden'
            height='100vh'
            width='100vw'>

        </Flex>
    )
}

export default ErrorPageContainer