import {
  Flex, Text
} from '@chakra-ui/react'
import { CustomSwitch } from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'

interface LocalEducationAgenciesFormSectionProps {
    name: string 
    description: string
    selected: boolean
    mode: 'add' | 'edit'
    onToggleOrgId: (e: ChangeEvent<HTMLInputElement>) => void
}

const LocalEducationAgenciesFormSection = ({ name, mode, description, selected, onToggleOrgId }: LocalEducationAgenciesFormSectionProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Text fontWeight='700'>Campuses</Text>

      <Flex
        alignItems='center'
        border='1px'
        borderColor='gray.300'
        borderRadius='4px'
        mt='12px'
        padding='8px 16px'
        w='full'
      >
        <CustomSwitch 
          id="localEducationAgencies"
          isChecked={selected}
          isDisabled={mode == 'edit'? true : false}
          onCheck={() => null}
        />

        <Flex
          flexDir='column'
          ml='15px'
        >
          <Text
            color='blue.600'
            fontFamily='Poppins'
            fontWeight='700'
          >{name}
          </Text>

          <Text
            color='gray.700'
            fontFamily='Poppins'
            fontWeight='400'
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LocalEducationAgenciesFormSection