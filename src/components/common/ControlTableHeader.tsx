import {
  TriangleDownIcon, TriangleUpIcon
} from '@chakra-ui/icons'
import {
  Button, Flex, Text
} from '@chakra-ui/react'
import { ControlTableHeaderField } from '../../core/controlTable'

interface ControlTableHeaderProps {
    headerData: ControlTableHeaderField
    justifyContent?: string 
}

const ControlTableHeader = ({ headerData, justifyContent }: ControlTableHeaderProps) => {
  return (
    <Flex
      alignItems='center'
      justifyContent={justifyContent ?? 'flex-start'}
      w='full'
    >
      <Text
        color='black'
        fontFamily='Poppins'
        fontSize='14px'
        fontWeight='700'
        lineHeight='20px'
        textTransform='none'
      >
        {headerData.text}
      </Text>

      {!(headerData.text === '') && headerData.showSorting && <Flex 
        color='gray.600' 
        flexDir='column' 
        fontSize='12px'
        ml='2px'
        w='5px'
      >
        <Flex
          flexDir='column'
          justifyContent='center'
          w='20px'
        >
          <Button 
            aria-labelledby={`sort-asc-${headerData.fieldName}`}
            color={headerData.sortedByField === headerData.fieldName && headerData.sortingType === 'asc'? 'gray.700' : 'gray.500'}
            data-testid={`sort-asc-${headerData.fieldName}`}
            h='3px'
            minW='5px'
            onClick={() => headerData.onSortAsc({ field: headerData.fieldName })}
          >
            <span
              hidden
              id={`sort-asc-${headerData.fieldName}`}
            >Sort ascending
            </span>

            <TriangleUpIcon 
              aria-label="Sort field ascending"
              focusable="true"
              fontSize='10px'
            />
          </Button>

          <Button 
            aria-labelledby={`sort-desc-${headerData.fieldName}`}
            color={headerData.sortedByField === headerData.fieldName && headerData.sortingType === 'desc' ? 'gray.700' : 'gray.500'}
            data-testid={`sort-desc-${headerData.fieldName}`}
            h='3px'
            minW='5px'
            mt='5px'
            onClick={() => headerData.onSortDesc({ field: headerData.fieldName })}
          >
            <span
              hidden
              id={`sort-desc-${headerData.fieldName}`}
            >Sort descending
            </span>

            <TriangleDownIcon 
              aria-label="Sort field descending" 
              focusable="true"
              fontSize='10px'
            />
          </Button>
        </Flex>
      </Flex>}
    </Flex>
  )
}

export default ControlTableHeader