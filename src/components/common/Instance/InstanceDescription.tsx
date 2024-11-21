import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useDisplayOdsVersions from '../../../hooks/odsInstances/useDisplayOdsVersions'
import useOdsInstanceDescription from '../../../hooks/odsInstances/useOdsInstanceDescription'
import useOdsInstanceEdFiStatus from '../../../hooks/odsInstances/useOdsInstanceEdFiStatus'
import useOdsInstanceHostingType from '../../../hooks/odsInstances/useOdsInstanceHostingType'
import ODSInstanceEdFiStatus from '../ODS/ODSInstanceEdFiStatus'
import InstanceDescriptionField from './InstanceDescriptionField'

interface InstanceDescriptionProps {
    instance: ODSInstance
}

const InstanceDescription = ({ instance }: InstanceDescriptionProps) => {
  const { 
    instanceOdsMetadata 
  } = useOdsInstanceDescription({ instance })

  const {
    displayEdFiVersionContent,
    displayTsdsVersionContent
  } = useDisplayOdsVersions({ instanceOdsMetadata })

  const { getOdsInstanceEdFiStatus } = useOdsInstanceEdFiStatus({
    instance,
    edFiMetadata: instanceOdsMetadata
  })

  const {
    getHostingType
  } = useOdsInstanceHostingType()

  return (
    <Flex>
      <Flex flexDir='column'>
        <InstanceDescriptionField
          content={displayEdFiVersionContent()}
          title='Ed-Fi Version'
        />

        <InstanceDescriptionField
          content={displayTsdsVersionContent()}
          title="Extension"
        />

        <InstanceDescriptionField 
          content={<ODSInstanceEdFiStatus status={getOdsInstanceEdFiStatus()} />}
          title="Ed-Fi Status"
        />
      </Flex>
    </Flex>
  )
}

export default InstanceDescription