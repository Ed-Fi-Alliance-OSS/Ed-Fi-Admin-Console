import { Flex, Grid, GridItem, Text } from "@chakra-ui/react"

interface ServiceHealth {
    name: string 
    uptimeDescription: string 
    uptimePercentage: number 
    updatedDate: string 
}

interface InstanceServiceHealthBarProps {
    serviceHealth: ServiceHealth
}

const InstanceServiceHealthBar = ({ serviceHealth }: InstanceServiceHealthBarProps) => {
    return (
        <Flex 
            bg='gray.100' 
            border='1px'
            borderColor='gray.300'
            borderRadius='4px'
            alignItems='center'
            padding='16px 16px 16px 24px'
            _notFirst={{ mt: '25px' }}>
                <Text 
                    fontFamily='Open sans'
                    fontWeight='700'
                    fontSize='sm'
                    w='160px'>
                        {serviceHealth.name}
                </Text>
                <Flex flexDir='column' ml='30px'>
                    <Text
                        color='gray.500'
                        fontFamily='Open sans'
                        fontWeight='400'
                        fontSize='sm'>{serviceHealth.uptimeDescription}</Text>
                    <Text   
                        color='gray.500'
                        fontFamily='Open sans'
                        fontWeight='400'
                        fontSize='sm'>{serviceHealth.updatedDate}</Text>
                </Flex>
                <Grid 
                    templateColumns={`repeat(${serviceHealth.uptimePercentage}, 7.3px)`} 
                    ml='40px' 
                    gap='1px'
                    h='28px' 
                    w='50%'>
                        {new Array(serviceHealth.uptimePercentage).fill(0).map((item, index) => 
                            <GridItem
                                key={index} 
                                bg='#3D8452'
                                color='green.300' />
                        )}
                </Grid>
        </Flex>
    )
}

export default InstanceServiceHealthBar