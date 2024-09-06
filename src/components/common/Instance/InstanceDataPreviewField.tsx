import { Flex, Text } from "@chakra-ui/react"

interface InstanceDataPreviewFieldProps {
    text: string 
    value?: string | number | null
}

const InstanceDataPreviewField = ({ text, value }: InstanceDataPreviewFieldProps) => {
    const selectValueColor = () => value? "#3D8452" : "gray.500"
    const selectTextColor = () => value? "#145025" : "gray.500"

    return (
        <Flex 
            alignItems='center'
            justifyContent='space-between'
            w='full'
            paddingY='10px'
            _notFirst={{ 
                borderBottom: "1px", 
                borderBottomColor: "gray.300" }}
            _last={{
                borderBottom: "0px",
                borderBottomColor: "gray.300"
            }}>
                    <Text
                        fontFamily='Poppins'
                        fontWeight='700'
                        color={selectTextColor()}
                        w='250px'>
                            {text}
                    </Text>
                    <Text
                        fontFamily='Poppins'
                        fontWeight='700'
                        color={selectValueColor()}>
                            {value? value : "--"}
                    </Text>
        </Flex>
    )
}

export default InstanceDataPreviewField