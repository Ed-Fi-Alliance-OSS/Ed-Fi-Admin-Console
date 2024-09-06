import { Flex, Text } from "@chakra-ui/react"
import { CustomSwitch } from "@edwire/edx-portal-shared"


interface AdvancedModeSwitchProps {
    checked: boolean
}

const AdvancedModeSwitch = ({ checked }: AdvancedModeSwitchProps) => {
    return (
        <Flex alignItems='center' justifyContent='flex-end'>
            <CustomSwitch
                id="advancedMode"
                isChecked={checked} />
            <Text 
                fontFamily='Open sans'
                fontWeight='700'
                size='2m'
                ml='15px'>
                    Advanced Mode
            </Text>
        </Flex>
    )
}

export default AdvancedModeSwitch