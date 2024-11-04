import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Button, Flex, Text } from '@chakra-ui/react'
import { ControlTableHeaderField } from '../../core/controlTable'

interface ControlTableHeaderProps {
    headerData: ControlTableHeaderField
    justifyContent?: string 
}

const ControlTableHeader = ({ headerData, justifyContent }: ControlTableHeaderProps) => {
  return (
    <Flex alignItems='center' w='full' justifyContent={justifyContent ?? 'flex-start'}>
      <Text
        color='black'
        fontFamily='Open sans'
        fontWeight='700'
        textTransform='none'
        fontSize='14px'
        lineHeight='20px'>
        {headerData.text}
      </Text>
      {!(headerData.text === '') && headerData.showSorting && <Flex 
        color='gray.600' 
        fontSize='12px' 
        flexDir='column'
        ml='2px'
        w='5px'>
        <Flex flexDir='column' justifyContent='center' w='20px'>
          <Button 
            onClick={() => headerData.onSortAsc({ field: headerData.fieldName })}
            aria-labelledby={`sort-asc-${headerData.fieldName}`}
            data-testid={`sort-asc-${headerData.fieldName}`}
            color={headerData.sortedByField === headerData.fieldName && headerData.sortingType === 'asc'? 'gray.700' : 'gray.500'}
            h='3px'
            minW='5px'>
            <span id={`sort-asc-${headerData.fieldName}`} hidden>Sort ascending</span>
            <TriangleUpIcon 
              fontSize='10px'
              aria-label="Sort field ascending"
              focusable="true" />
          </Button>
          <Button 
            onClick={() => headerData.onSortDesc({ field: headerData.fieldName })}
            aria-labelledby={`sort-desc-${headerData.fieldName}`}
            data-testid={`sort-desc-${headerData.fieldName}`}
            color={headerData.sortedByField === headerData.fieldName && headerData.sortingType === 'desc' ? 'gray.700' : 'gray.500'}
            h='3px'
            minW='5px'
            mt='5px'>
            <span id={`sort-desc-${headerData.fieldName}`} hidden>Sort descending</span>
            <TriangleDownIcon 
              fontSize='10px' 
              aria-label="Sort field descending"
              focusable="true"/>
          </Button>
        </Flex>
      </Flex>}
    </Flex>
  )
}

export default ControlTableHeader