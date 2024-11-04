import { Flex } from '@chakra-ui/react'
import SummaryContent from './SummaryContent'
import { ODSInstance } from '../../../core/ODSInstance.types'

interface InstanceSummaryTabContentProps {
    instance: ODSInstance
}

const InstanceSummaryTabContent = ({ instance }: InstanceSummaryTabContentProps) => {
  return (
    <Flex w='full'>
      <SummaryContent
        instance={instance} />
    </Flex>
  )
}

export default InstanceSummaryTabContent