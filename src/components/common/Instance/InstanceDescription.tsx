import {
  Flex, Spinner
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { useEdfiMetadata } from '../../../hooks/odsInstances/useEdfiMetadata'
import ODSInstanceEdFiVersion from '../ODS/ODSInstaceEdFiVersion'
import ODSInstanceEdFiStatus from '../ODS/ODSInstanceEdFiStatus'
import ODSInstanceDataModelsLabel from '../ODS/ODSInstanceTSDSVersion'
import InstanceDescriptionField from './InstanceDescriptionField'

interface InstanceDescriptionProps {
    instance: ODSInstance
}

const InstanceDescription = ({ instance }: InstanceDescriptionProps) => {
  
  const { edFiStatus, edfiMetadata, metaDataLoading } = useEdfiMetadata()

  return (
    <Flex>
      <Flex flexDir='column'>
        <InstanceDescriptionField
          content={instance.name}
          title='Instance Name'
        />
        
        <InstanceDescriptionField
          content={instance.instanceType}
          title='Instance Type'
        />
        
      
        {metaDataLoading ? <Spinner /> : <Flex
          flexDir="column"
          mt={5}
        >
          <InstanceDescriptionField
            content={<ODSInstanceEdFiVersion version={edfiMetadata?.version} />}
            title='Ed-Fi Version'
          />

          <InstanceDescriptionField
            content={<ODSInstanceDataModelsLabel dataModels={edfiMetadata?.dataModels} />}
            title="Extension"
          />

          <InstanceDescriptionField 
            content={<ODSInstanceEdFiStatus status={edFiStatus} />}
            title="Ed-Fi Status"
          />
        </Flex>}
      </Flex>
    </Flex>
  )
}

export default InstanceDescription