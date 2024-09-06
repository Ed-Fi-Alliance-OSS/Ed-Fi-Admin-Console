import { ChangeEvent } from 'react'
import { Button, Flex, FormControl } from "@chakra-ui/react"
import { CustomFormLabel, CustomSelect, CustomFormHeader, CustomInput } from "@edwire/edx-portal-shared"

interface AddInstanceFormProps {
    instanceName: string 
    instanceDescription: string
    schoolYear: string 
    schoolYearOptions: string[]
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void
    onSaveChanges: () => void
}

const AddInstanceForm = ({ instanceName, instanceDescription, schoolYear, schoolYearOptions, onInputChange, onSelectChange, onSaveChanges }: AddInstanceFormProps) => {
    return (
        <Flex flexDir='column' w='full'>
            <CustomFormHeader text="Instance Details" />
            <Flex flexDir='column' mt='16px' ml='10px' w='full'>
                <FormControl>
                    <CustomFormLabel 
                        text="Instance Name"
                        htmlFor="instanceName" />
                    <CustomInput
                        id="instanceName" 
                        value={instanceName}
                        onChange={onInputChange} />
                </FormControl>
                <FormControl mt='16px'>
                    <CustomFormLabel 
                        text="Description"
                        htmlFor="instanceDescription" />
                    <CustomInput
                        id="instanceDescription" 
                        value={instanceDescription}
                        onChange={onInputChange} />
                </FormControl>
            </Flex>

            <Flex flexDir='column' mt='48px'>
                <CustomFormHeader text="School Years" />
                <Flex flexDir='column' mt='16px' ml='10px' w='full'>
                    <FormControl>
                        <CustomFormLabel 
                            text='School Year'
                            htmlFor='schoolYear' />
                        <CustomSelect
                            value={schoolYear}
                            options={schoolYearOptions.map(year => ({ value: year, text: year }) )}
                            onChange={onSelectChange} />
                    </FormControl>
                </Flex>
            </Flex>
            <Button
                mt='32px'
                variant='primaryBlue600'
                size='lg'
                w='250px'>
                    Create Instance
            </Button>
        </Flex>
    )
}

export default AddInstanceForm