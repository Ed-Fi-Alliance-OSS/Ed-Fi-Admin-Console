import { GridItem, Flex, Text } from '@chakra-ui/react'

interface DataHealthDetailsItemProps {
    text: string 
    value?: number | null
}

const DataHealthDetailsItem = ({ text, value }: DataHealthDetailsItemProps) => {
    const selectColor = () => value? "green.400" : "gray.300"
    const selectValueColor = () => value? "#3D8452" : "gray.500"
    const selectTextColor = () => value? "#145025" : "gray.500"

    return (
        <GridItem 
            border='1px'
            borderColor={selectColor()}
            borderRadius='4px'
            padding='10px 10px'
            h='115px'
            w='full'>
                <Flex flexDir='column' h='full' w='full'>
                    <Text 
                        fontFamily='Open sans'
                        color={selectTextColor()}
                        fontWeight='700'
                        fontSize='14px'>{text}</Text>
                    <Text
                        color={selectValueColor()}
                        fontWeight='700'
                        fontSize='28px'
                        mt='auto'
                        h='30px'>{value? value : "--"}</Text>
                </Flex>
        </GridItem>
    )
}

export default DataHealthDetailsItem