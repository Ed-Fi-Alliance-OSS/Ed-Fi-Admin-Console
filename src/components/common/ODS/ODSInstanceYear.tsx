import {
  Flex, Link
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceLink from '../../../hooks/odsInstances/useOdsInstanceLink'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'

interface ODSInstanceYearProps {
    instance: ODSInstance
}

const ODSInstanceYear = ({ instance }: ODSInstanceYearProps) => {
  const { getOdsInstanceLink } = useOdsInstanceLink()
  const { getDisplayYear } = useOdsInstanceDisplayYear()

  return (
    <Flex
      flexDir='column'
      flexWrap='wrap'
      h='auto'
      w='250px'
    >
      <Link 
        as={RouterLink} 
        color='blue.600'
        fontFamily='Poppins'
        fontWeight='700'
        lineHeight='22px'
        size='md'
        state={{ instanceId: instance.instanceId }}
        to={getOdsInstanceLink(instance)}
        w="100px"
      >
        { getDisplayYear(instance) }
      </Link>
    </Flex>
  )
}

export default ODSInstanceYear