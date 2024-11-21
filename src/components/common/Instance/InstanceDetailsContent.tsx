import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import TabHeading from '../TabHeading'
import InstanceDetailsForm from './InstanceDetailsForm'

interface InstanceDetailsContentProps {
    mode: 'add' | 'edit'
    instance?: ODSInstance
}

const InstanceDetailsContent = ({ mode, instance }: InstanceDetailsContentProps) => {
  return (
    <Flex w='full'>
      <TabHeading text={mode === 'add'? 'Create Instance' : 'Edit Instance Details'} />

      <Flex
        ml='45px'
        mt='15px'
        w='full'
      >
        <InstanceDetailsForm
          instance={instance}
          mode={mode}
        />
      </Flex>
    </Flex>
  )
}

export default InstanceDetailsContent