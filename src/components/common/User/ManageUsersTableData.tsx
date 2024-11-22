import { Td } from '@chakra-ui/react'

interface ManageUsersTableDataProps {
    children: JSX.Element | JSX.Element[]
    width: string 
}

const ManageUsersTableData = ({ children, width }: ManageUsersTableDataProps) => {
  return (
    <Td 
      minW='50px' 
      paddingLeft='16px' 
      paddingRight='16px'
      w={width}
    >
      {children}
    </Td>
  )
}

export default ManageUsersTableData