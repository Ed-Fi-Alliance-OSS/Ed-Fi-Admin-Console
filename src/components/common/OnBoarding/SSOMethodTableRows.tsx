import { Td, Text } from "@chakra-ui/react"
import { SSOMethod } from "../../../core/ssoMethods/SSOMethods.types"
import ControlTableRow from "../ControlTableRow"
import { CustomSwitch } from "@edfi/admin-console-shared-sdk"
import SSOConsentStatus from "./SSOConsentStatus"

interface SSOMethodTableRowsProps {
    showOnlySelected: boolean
    ssoMethodsList: SSOMethod[]
    onToggleSSOMethod: (value: string) => void
}

const SSOMethodTableRows = ({ ssoMethodsList, showOnlySelected, onToggleSSOMethod }: SSOMethodTableRowsProps) => {
    return (
        <>
            {ssoMethodsList.filter(item => showOnlySelected? item.selected : true).map((ssoMethod, index) => 
                <ControlTableRow key={index}>
                    <Td w={showOnlySelected? 'full' : 'auto'}>
                        <Text
                            color='blue.600'
                            fontFamily='Open sans'
                            fontWeight='700'
                            size='md'>
                                {ssoMethod.name}
                        </Text>
                    </Td>
                    <Td w='50%'>
                        <SSOConsentStatus status={ssoMethod.consentStatus} />
                    </Td>
                    {!showOnlySelected? <Td>
                        <CustomSwitch
                            id={ssoMethod.name}
                            isDisabled={ssoMethod.name === 'Acme Service Center'}  
                            isChecked={ssoMethod.selected}
                            onCheck={() => onToggleSSOMethod(ssoMethod.name)} />
                    </Td> : <Td padding='0' w='0px'></Td>}
                </ControlTableRow>
            )}
        </>
    )
}

export default SSOMethodTableRows