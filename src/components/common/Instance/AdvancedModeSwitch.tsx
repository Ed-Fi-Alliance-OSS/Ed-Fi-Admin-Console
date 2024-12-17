import {
  Flex, Text
} from '@chakra-ui/react'
import { CustomSwitch } from '@edfi/admin-console-shared-sdk'


interface AdvancedModeSwitchProps {
    checked: boolean
}

const AdvancedModeSwitch = ({ checked }: AdvancedModeSwitchProps) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='flex-end'
    >
      <CustomSwitch
        id="advancedMode"
        isChecked={checked}
      />

      <Text 
        fontFamily='Poppins'
        fontWeight='700'
        ml='15px'
        size='2m'
      >
        Advanced Mode
      </Text>
    </Flex>
  )
}

export default AdvancedModeSwitch