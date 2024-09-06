import { Flex, Skeleton, Text, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { ControlTableRowList } from "../../core/controlTable"

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
            w='full'>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            {headers.map((header, index) => 
                                <Th 
                                    aria-hidden={header !== null}
                                    borderBottom='1px'
                                    borderBottomColor='gray.300'
                                    padding={thPadding}
                                    key={index}>
                                        {header}
                                </Th>
                            )}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rows}
                    </Tbody>
                </Table>
                {itemsCount === 0 && loading && <Flex flexDir='column' padding='16px' w='full'>
                    {generateSkeletonArray().map((item, index) => 
                        <Skeleton 
                            key={index} 
                            h='35px' 
                            w='full'
                            _notFirst={{ mt: '12px' }} />
                    )}
                </Flex>}
                {itemsCount === 0 && !loading && <Flex flexDir='column' padding='16px' w='full'>
                    <Flex h='35px' justifyContent='center' alignItems='center' w='full'>
                        <Text 
                            fontFamily='Open sans'
                            fontWeight='700'
                            fontSize='16px'>
                                There are 0 items to show
                        </Text>
                    </Flex>
                </Flex>}
                {pagination &&  
                    <Flex
                        borderTop='2px' 
                        _notLast={{ borderBottom: '2px', borderBottomColor: 'gray.300' }}
                        borderTopColor='gray.300'
                        py='16px'
                        px='16px'
                        w='full'>
                            <Flex w='full'>
                                {pagination}
                            </Flex>
                    </Flex>}
        </TableContainer>
    )
}

export default ControlTable