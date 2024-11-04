import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import InstanceDataPreview from './InstanceDataPreview'
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
      <Flex ml='auto'>
        <InstanceDataPreview
          instance={instance} />
      </Flex>
    </>
  )
}

export default SummaryContent