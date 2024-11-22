import { Button, Flex } from '@chakra-ui/react'

interface PartnersAndApplicationControlsProps {
    onAddPartner: () => void
    onRefresh: () => void
}

const PartnersAndApplicationControls = ({ onAddPartner, onRefresh }: PartnersAndApplicationControlsProps) => {
  return (
    <Flex justifyContent='flex-end'>
      <Flex alignItems='center' mt='5px'>
        <Button
          onClick={onRefresh}
          variant='secondaryBlue600'
          size='xs'
          p='0 25px'
          minW='5px'>
                        Refresh List
        </Button>
        <Button
          onClick={onAddPartner}
          variant='primaryBlue600'
          size='xs'
          p='0 25px'
          minW='5px'
          ml='8px'>
                        Add Vendor
        </Button>
      </Flex>
    </Flex>
  )
}

export default PartnersAndApplicationControls