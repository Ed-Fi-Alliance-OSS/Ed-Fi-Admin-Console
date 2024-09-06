import { Flex, Td, Text } from "@chakra-ui/react"
import ControlTableRow from "../ControlTableRow"

interface APIClientsTableRowsProps {
    apiClientList: string[]
}

const APIClientsTableRows = ({ apiClientList }: APIClientsTableRowsProps) => {
    return (
        <>
            {apiClientList.map((client, index) => 
                <ControlTableRow key={index}>
                    <Td w='917px'>
                       {client}
                    </Td>
                </ControlTableRow>
            )}
        </>
    )
}

export default APIClientsTableRows