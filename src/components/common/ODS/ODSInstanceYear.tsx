import { Flex, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { ODSInstance } from "../../../core/ODSInstance.types"
import useOdsInstanceLink from "../../../hooks/odsInstances/useOdsInstanceLink"
import useOdsInstanceDisplayYear from "../../../hooks/odsInstances/useOdsInstanceYearName"

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
            w='250px'>
                <Link 
                    as={RouterLink} 
                    to={getOdsInstanceLink(instance)}
                    state={{ instanceId: instance.instanceId }}
                    color='blue.600'
                    fontFamily='Open sans'
                    fontWeight='700'
                    size='md'
                    lineHeight='22px'
                    w="100px">
                        { getDisplayYear(instance) }
                </Link>
        </Flex>
    )
}

export default ODSInstanceYear