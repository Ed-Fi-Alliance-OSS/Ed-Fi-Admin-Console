import { Flex, Text } from '@chakra-ui/react'

const DistrictSchoolsTableHeader = () => {
  return (
    <Flex 
      data-testid="district-table"
      border='1px'
      borderBottom='0px'
      borderRadius='4px 4px 0 0'
      borderColor='gray.300'
      padding='16px'
      alignItems='center'
      justifyContent='space-between' 
      height='52px'
      w='full'>
      <Flex w='191px'>
        <Text
          fontFamily='Open sans'
          fontWeight='700'
          size='14px'>District Name</Text>
      </Flex>
      <Flex w='231px'>
        <Text
          fontFamily='Open sans'
          fontWeight='700'
          size='14px'>Education Organization</Text>
      </Flex>
      <Flex w='273px'>
        <Text
          fontFamily='Open sans'
          fontWeight='700'
          size='14px'>Domain(s)</Text>
      </Flex>
      <Flex w='150px'>
        <Text
          fontFamily='Open sans'
          fontWeight='700'
          size='14px'>School Count</Text>
      </Flex>
    </Flex>
  )
}

export default DistrictSchoolsTableHeader