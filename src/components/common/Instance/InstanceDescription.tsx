import { Flex } from "@chakra-ui/react"
import { ODSInstance } from "../../../core/ODSInstance.types"
import useOdsInstanceDescription from "../../../hooks/odsInstances/useOdsInstanceDescription"
import ODSInstanceEdFiStatus from "../ODS/ODSInstanceEdFiStatus"
import InstanceDescriptionField from "./InstanceDescriptionField"
import useDisplayOdsVersions from "../../../hooks/odsInstances/useDisplayOdsVersions"
import useOdsInstanceEdFiStatus from "../../../hooks/odsInstances/useOdsInstanceEdFiStatus"
import useOdsInstanceHostingType from "../../../hooks/odsInstances/useOdsInstanceHostingType"

interface InstanceDescriptionProps {
    instance: ODSInstance
}

const InstanceDescription = ({ instance }: InstanceDescriptionProps) => {
    const { 
        getInstanceBaseUrl,
        instanceOdsMetadata 
    } = useOdsInstanceDescription({ instance })

    const {
        displayEdFiVersionContent,
        displayTsdsVersionContent
    } = useDisplayOdsVersions({ 
        instanceOdsMetadata
    })

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
                    title="Ed-Fi Base URL"
                    content={getInstanceBaseUrl()} />
                <InstanceDescriptionField
                    title='Ed-Fi Version'
                    content={displayEdFiVersionContent()} />
                <InstanceDescriptionField
                    title="TSDS Version"
                    content={displayTsdsVersionContent()} />
                <InstanceDescriptionField 
                    title="Ed-Fi Status"
                    content={<ODSInstanceEdFiStatus 
                        status={getOdsInstanceEdFiStatus()} />} />
                <InstanceDescriptionField 
                    title="Hosting"
                    content={getHostingType(instance)} />
            </Flex>
        </Flex>
    )
}

export default InstanceDescription