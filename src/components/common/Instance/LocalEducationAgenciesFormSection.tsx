import { Flex, Text } from "@chakra-ui/react"
import { CustomSwitch } from "@edwire/edx-portal-shared"
import { ChangeEvent } from "react"

interface LocalEducationAgenciesFormSectionProps {
    name: string 
    description: string
    selected: boolean
    mode: "add" | "edit"
    onToggleOrgId: (e: ChangeEvent<HTMLInputElement>) => void
}

const LocalEducationAgenciesFormSection = ({ name, mode, description, selected, onToggleOrgId }: LocalEducationAgenciesFormSectionProps) => {
    return (
        <Flex flexDir='column' w='full'>
            <Text fontWeight='700'>Campuses</Text>
            <Flex
                border='1px'
                borderColor='gray.300'
                borderRadius='4px'
                alignItems='center'
                padding='8px 16px'
                w='full'
                mt='12px'>
                    <CustomSwitch 
                        id="localEducationAgencies"
                        isDisabled={mode == "edit"? true : false}
                        isChecked={selected}
                        onCheck={() => null} />
                    <Flex flexDir='column' ml='15px'>
                        <Text
                            color='blue.600'
                            fontFamily='Open sans'
                            fontWeight='700'>{name}</Text>
                        <Text
                            color='gray.700'
                            fontFamily='Open sans'
                            fontWeight='400'>
                                {description}
                        </Text>
                    </Flex>
            </Flex>
        </Flex>
    )
}

export default LocalEducationAgenciesFormSection