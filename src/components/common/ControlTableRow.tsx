import { Tr } from '@chakra-ui/react'

interface ControlTableRowProps {
    children: JSX.Element | JSX.Element[]
    removeBorders?: boolean
}

const ControlTableRow = ({ children, removeBorders }: ControlTableRowProps) => {
  return (
    <Tr 
      _notLast={{
        borderBottom: removeBorders? '0px' : '2px',
        borderBottomColor: 'gray.300' 
      }}
      borderTop={removeBorders? '0px' : '2px'} 
      borderTopColor='gray.300'
      position='relative'
      w='full'
    >
      {children}
    </Tr>
  )
}

export default ControlTableRow