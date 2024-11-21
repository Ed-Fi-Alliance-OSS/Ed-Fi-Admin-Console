import { Flex } from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import PartnersAndApplicationControls from './PartnersAndApplicationControls'

interface PartnersAndApplicationTabHeaderProps {
   onAddPartner: () => void
   onRefresh: () => void
}

const PartnersAndApplicationTabHeader = ({ onAddPartner, onRefresh }: PartnersAndApplicationTabHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <TabHeading text='Vendors & Applications' />

      <PartnersAndApplicationControls
        onAddPartner={onAddPartner}
        onRefresh={onRefresh}
      />
    </Flex>
  )
}

export default PartnersAndApplicationTabHeader