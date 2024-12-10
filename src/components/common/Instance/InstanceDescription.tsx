import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useDisplayOdsVersions from '../../../hooks/odsInstances/useDisplayOdsVersions'
import useOdsInstanceDescription from '../../../hooks/odsInstances/useOdsInstanceDescription'
import useOdsInstanceEdFiStatus from '../../../hooks/odsInstances/useOdsInstanceEdFiStatus'
import useOdsInstanceHostingType from '../../../hooks/odsInstances/useOdsInstanceHostingType'
import useOdsInstanceYear from '../../../hooks/odsInstances/useOdsInstanceYear'
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

  const { getInstanceYear } = useOdsInstanceYear()

  const {
    getHostingType
  } = useOdsInstanceHostingType()

  return (
    <Flex>
      <Flex flexDir='column'>
        <InstanceDescriptionField
          content={instance.document.name}
          title='Instance Name'
        />
        
        <InstanceDescriptionField
          content={instance.odsInstanceId}
          title='Instance ID'
        />
        
        <InstanceDescriptionField
          content={getInstanceYear(instance)?.toString() ?? ''}
          title='Instance Year'
        />

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