import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import SummaryContent from './SummaryContent'

interface InstanceSummaryTabContentProps {
    instance: ODSInstance
}

const InstanceSummaryTabContent = ({ instance }: InstanceSummaryTabContentProps) => {
  return (
    <Flex w='full'>

      <SummaryContent instance={instance} />
    </Flex>
  )
}

export default InstanceSummaryTabContent