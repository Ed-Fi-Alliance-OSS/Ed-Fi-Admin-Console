import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, Text } from '@chakra-ui/react'
import DomainTag from '../DomainTag'

interface DomainSelectProps {
    domains: string[]
}

const DomainSelect = ({ domains }: DomainSelectProps) => {
  return (
    <Flex>
      {domains.map((domain, index) => 
        <DomainTag domain={domain} key={index} />
      )}
      <Button 
        variant='secondaryBlue600'
        size='sm'
        ml='10px'
        padding='0'
        h='28px'
        w='28px'
        minW='28px'
        aria-labelledby="add-btn">
        <span id="add-btn">Add</span>
        <AddIcon 
          fontSize='10px'
          fontWeight='bold'
          aria-hidden="true" 
          focusable="false"  />
      </Button>
    </Flex>
  )
}

export default DomainSelect