import {
  Flex, Text
} from '@chakra-ui/react'

const DistrictSchoolsTableHeader = () => {
  return (
    <Flex 
      alignItems='center'
      border='1px'
      borderBottom='0px'
      borderColor='gray.300'
      borderRadius='4px 4px 0 0'
      data-testid="district-table"
      height='52px'
      justifyContent='space-between' 
      padding='16px'
      w='full'
    >
      <Flex w='191px'>
        <Text
          fontFamily='Poppins'
          fontWeight='700'
          size='14px'
        >District Name
        </Text>
      </Flex>

      <Flex w='231px'>
        <Text
          fontFamily='Poppins'
          fontWeight='700'
          size='14px'
        >Education Organization
        </Text>
      </Flex>

      <Flex w='273px'>
        <Text
          fontFamily='Poppins'
          fontWeight='700'
          size='14px'
        >Domain(s)
        </Text>
      </Flex>

      <Flex w='150px'>
        <Text
          fontFamily='Poppins'
          fontWeight='700'
          size='14px'
        >School Count
        </Text>
      </Flex>
    </Flex>
  )
}

export default DistrictSchoolsTableHeader