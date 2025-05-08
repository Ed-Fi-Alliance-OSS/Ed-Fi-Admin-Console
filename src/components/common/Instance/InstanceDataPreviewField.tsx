import {
  Flex, Text 
} from '@chakra-ui/react'

interface InstanceDataPreviewFieldProps {
    text: string
    value?: string | number | null
}

const InstanceDataPreviewField = ({ text, value }: InstanceDataPreviewFieldProps) => {
  const selectValueColor = () => value ? '#3D8452' : 'gray.500'
  const selectTextColor = () => value ? '#145025' : 'gray.500'

  return (
    <Flex
      _last={{
        borderBottom: '0px',
        borderBottomColor: 'gray.300'
      }}
      _notFirst={{
        borderBottom: '1px',
        borderBottomColor: 'gray.300'
      }}
      alignItems='center'
      justifyContent='space-between'
      paddingY='10px'
      w='full'
    >
      <Text
        color={selectTextColor()}
        fontFamily='Poppins'
        fontWeight='700'
        w='250px'
      >
        {text}
      </Text>
      <Text
        color={selectValueColor()}
        fontFamily='Poppins'
        fontWeight='700'
      >
        {value ? value : '--'}
      </Text>
    </Flex>
  )
}

export default InstanceDataPreviewField