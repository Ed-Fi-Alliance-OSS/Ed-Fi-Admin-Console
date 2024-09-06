import { Td } from "@chakra-ui/react"

interface UserSyncTableDataProps {
    children: JSX.Element | JSX.Element[]
    width: string 
}

const UserSyncTableData = ({ children, width }: UserSyncTableDataProps) => {
    return (
        <Td 
            paddingLeft='16px' 
            paddingRight='16px' 
            minW='50px'
            w={width}>
                {children}
        </Td>
    )
}

export default UserSyncTableData