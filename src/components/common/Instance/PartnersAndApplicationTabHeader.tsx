import { Flex } from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import PartnersAndApplicationControls from './PartnersAndApplicationControls'

interface PartnersAndApplicationTabHeaderProps {
   onAddVendor: () => void
   onRefresh: () => void
}

const PartnersAndApplicationTabHeader = ({ onAddVendor, onRefresh }: PartnersAndApplicationTabHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <TabHeading text='Vendors & Applications' />

      <PartnersAndApplicationControls
        onAddPartner={onAddVendor}
        onRefresh={onRefresh}
      />
    </Flex>
  )
}

export default PartnersAndApplicationTabHeader