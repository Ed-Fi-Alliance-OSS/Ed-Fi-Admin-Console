import { AddIcon } from '@chakra-ui/icons'
import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import DomainTag from '../DomainTag'

interface DomainSelectProps {
    domains: string[]
}

const DomainSelect = ({ domains }: DomainSelectProps) => {
  return (
    <Flex>
      {domains.map((domain, index) => 
        <DomainTag
          key={index}
          domain={domain}
        />)}

      <Button 
        aria-labelledby="add-btn"
        h='28px'
        minW='28px'
        ml='10px'
        padding='0'
        size='sm'
        variant='secondaryBlue600'
        w='28px'
      >
        <span id="add-btn">Add</span>

        <AddIcon 
          aria-hidden="true"
          focusable="false"
          fontSize='10px' 
          fontWeight='bold'
        />
      </Button>
    </Flex>
  )
}

export default DomainSelect