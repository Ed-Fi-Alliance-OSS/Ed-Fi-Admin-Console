import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import InstanceDescription from './InstanceDescription'

interface SummaryContentProps {
    instance: ODSInstance 
}

const SummaryContent = ({ instance }: SummaryContentProps) => {
  return (
    <>
      <Flex>
        <InstanceDescription 
          instance={instance} />
      </Flex>
    </>
  )
}

export default SummaryContent