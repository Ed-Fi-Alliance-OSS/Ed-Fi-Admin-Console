import { Text } from "@chakra-ui/react"

interface ODSInstanceTSDSVersionProps {
    version: string
}

const ODSInstanceTSDSVersion = ({ version }: ODSInstanceTSDSVersionProps) => {
    return (
        <Text
            fontFamily='Open sans'
            fontWeight='400'
            size='md'>
                { version }
        </Text>
    )
}

export default ODSInstanceTSDSVersion