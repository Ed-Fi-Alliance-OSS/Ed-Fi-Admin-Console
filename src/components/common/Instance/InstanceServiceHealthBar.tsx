import {
  Flex, Grid, GridItem, Text 
} from '@chakra-ui/react'

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
      _notFirst={{ mt: '25px' }} 
      alignItems='center'
      bg='gray.100'
      border='1px'
      borderColor='gray.300'
      borderRadius='4px'
      padding='16px 16px 16px 24px'
    >
      <Text 
        fontFamily='Open sans'
        fontSize='sm'
        fontWeight='700'
        w='160px'
      >
        {serviceHealth.name}
      </Text>

      <Flex
        flexDir='column'
        ml='30px'
      >
        <Text
          color='gray.500'
          fontFamily='Open sans'
          fontSize='sm'
          fontWeight='400'
        >{serviceHealth.uptimeDescription}
        </Text>

        <Text   
          color='gray.500'
          fontFamily='Open sans'
          fontSize='sm'
          fontWeight='400'
        >{serviceHealth.updatedDate}
        </Text>
      </Flex>

      <Grid 
        gap='1px' 
        h='28px' 
        ml='40px'
        templateColumns={`repeat(${serviceHealth.uptimePercentage}, 7.3px)`} 
        w='50%'
      >
        {new Array(serviceHealth.uptimePercentage).fill(0).map((item, index) => 
          <GridItem
            key={index} 
            bg='#3D8452'
            color='green.300'
          />)}
      </Grid>
    </Flex>
  )
}

export default InstanceServiceHealthBar