import { Text } from '@chakra-ui/react'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceHostingType from '../../../hooks/odsInstances/useOdsInstanceHostingType'

interface ODSInstanceHostingTypeProps {
    instance: ExtendedODSInstance | null
}

const ODSInstanceHostingType = ({ instance }: ODSInstanceHostingTypeProps) => {
  const {
    getHostingType
  } = useOdsInstanceHostingType()

  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      { getHostingType(instance) }
    </Text>
  )
}

export default ODSInstanceHostingType