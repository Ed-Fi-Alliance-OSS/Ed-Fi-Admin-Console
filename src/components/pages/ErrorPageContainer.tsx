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
                <EDXErrorPage 
                    errorStatus={status}
                    height="100vh"
                    minHeight="100vh"
                    minWidth="100vw"
                    width="100vw"
                    primaryButtonBackUrl=""
                    primaryButtonLabel="" />
        </Flex>
    )
}

export default ErrorPageContainer