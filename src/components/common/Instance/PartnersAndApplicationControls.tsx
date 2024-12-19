import {
  Button, Flex 
} from '@chakra-ui/react'

interface PartnersAndApplicationControlsProps {
    onAddPartner: () => void
    onRefresh: () => void
}

const PartnersAndApplicationControls = ({ onAddPartner, onRefresh }: PartnersAndApplicationControlsProps) => {
  return (
    <Flex justifyContent='flex-end'>
      <Flex
        alignItems='center'
        mt='5px'
      >
        <Button
          minW='5px'
          p='0 25px'
          size='xs'
          variant='secondaryBlue600'
          onClick={onRefresh}
        >
          Refresh List
        </Button>

        <Button
          minW='5px'
          ml='8px'
          p='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onAddPartner}
        >
          Add Vendor
        </Button>
      </Flex>
    </Flex>
  )
}

export default PartnersAndApplicationControls