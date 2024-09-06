import { Flex } from "@chakra-ui/react"
import TabHeading from "../TabHeading"
import PartnersAndApplicationControls from "./PartnersAndApplicationControls"

interface PartnersAndApplicationTabHeaderProps {
   onAddPartner: () => void
}

const PartnersAndApplicationTabHeader = ({ onAddPartner }: PartnersAndApplicationTabHeaderProps) => {
    return (
       <Flex justifyContent='space-between' w='full'>
            <TabHeading text='Partners & Applications' />
            <PartnersAndApplicationControls onAddPartner={onAddPartner} />
       </Flex>
    )
}

export default PartnersAndApplicationTabHeader