import {
  Flex, Skeleton, Text, Table, TableContainer, Tbody, Th, Thead, Tr 
} from '@chakra-ui/react'
import { ControlTableRowList } from '../../core/controlTable'

interface ControlTableProps {
    headers: JSX.Element[]
    rows: ControlTableRowList
    thPadding: string
    itemsCount: number
    pagination?: JSX.Element
    loading: boolean
}

const generateSkeletonArray = () => {
  const array = new Array(10).fill(0)

  return array
}

const ControlTable = ({ headers, rows, thPadding, itemsCount, loading, pagination }: ControlTableProps) => {
  return (
    <TableContainer 
      bg='white'
      border='1px' 
      borderColor='gray.300'
      borderRadius='4px'
      w='full'
    >
      <Table variant='simple'>
        <Thead>
          <Tr>
            {headers.map((header, index) => 
              <Th 
                key={index}
                aria-hidden={header !== null}
                borderBottom='1px'
                borderBottomColor='gray.300'
                padding={thPadding}
              >
                {header}
              </Th>)}
          </Tr>
        </Thead>

        <Tbody>
          {rows}
        </Tbody>
      </Table>

      {itemsCount === 0 && loading && <Flex
        flexDir='column'
        padding='16px'
        w='full'
      >
        {generateSkeletonArray().map((item, index) => 
          <Skeleton 
            key={index} 
            _notFirst={{ mt: '12px' }} 
            h='35px'
            w='full'
          />)}
      </Flex>}

      {itemsCount === 0 && !loading && <Flex
        flexDir='column'
        padding='16px'
        w='full'
      >
        <Flex
          alignItems='center'
          h='35px'
          justifyContent='center'
          w='full'
        >
          <Text 
            fontFamily='Open sans'
            fontSize='16px'
            fontWeight='700'
          >
            There are 0 items to show
          </Text>
        </Flex>
      </Flex>}

      {pagination &&  
      <Flex
        _notLast={{
          borderBottom: '2px',
          borderBottomColor: 'gray.300' 
        }} 
        borderTop='2px'
        borderTopColor='gray.300'
        px='16px'
        py='16px'
        w='full'
      >
        <Flex w='full'>
          {pagination}
        </Flex>
      </Flex>}
    </TableContainer>
  )
}

export default ControlTable