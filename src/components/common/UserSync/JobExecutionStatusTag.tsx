import { Flex, Text } from "@chakra-ui/react"
import { JobExecutionStatus } from "../../../core/UserSync/UserSync.types"

const mapExecutionStatus = (status: number): JobExecutionStatus => {
    if (status === 0)
        return "Unknown"

    if (status === 1)
        return "Queued"

    if (status === 2)
        return "Running"

    if (status === 3)
        return "Completed"

    if (status === 4)
        return "Completed with errors"

    if (status === 5)
        return "Cancelled"

    return "Error"
}

interface JobExecutionStatusTagProps {
    executionStatus: number 
}

const JobExecutionStatusTag = ({ executionStatus }: JobExecutionStatusTagProps) => {
    const status: JobExecutionStatus = mapExecutionStatus(executionStatus)

    const selectBorderColor = (): string => {
        if (status === "Unknown")
            return 'gray.300'

        if (status === "Queued")
            return 'gray.300'

        if (status === "Running")
            return 'orange.400'

        if (status === "Completed with errors")
            return 'orange.400'

        if (status === "Completed")
            return "green.400"

        return 'red.500'
    }

    const selectTextColor = (): string => {
        if (status === "Unknown")
            return 'gray.700'

        if (status === "Queued")
            return 'gray.700'

        if (status === "Running")
            return 'orange.600'

        if (status === "Completed with errors")
            return 'orange.600'

        if (status === "Completed")
            return "green.800"

        return 'red.700'
    }

    const selectText = (): string => {
        if (status === 'Completed with errors') 
            return "Completed, with errors"

        return status
    }

    return (
        <Flex 
            alignItems='center'
            justifyContent='center'
            border='1px'
            borderRadius='4px'
            borderColor={selectBorderColor()}
            h='32px'
            w='160px'>
                <Text
                    color={selectTextColor()}
                    fontFamily='Archivo Narrow'
                    fontWeight='400'
                    size='md'>
                        { selectText() }
                </Text>
        </Flex>
    )
}

export default JobExecutionStatusTag