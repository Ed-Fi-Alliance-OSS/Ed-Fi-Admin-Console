import { Tr } from "@chakra-ui/react"

interface ControlTableRowProps {
    children: JSX.Element | JSX.Element[]
    removeBorders?: boolean
}

const ControlTableRow = ({ children, removeBorders }: ControlTableRowProps) => {
    return (
        <Tr 
            position='relative'
            borderTop={removeBorders? '0px' : '2px'} 
            _notLast={{ borderBottom: removeBorders? '0px' : '2px', borderBottomColor: 'gray.300' }}
            borderTopColor='gray.300'
            w='full'>
                {children}
        </Tr>
    )
}

export default ControlTableRow