import { Flex, FormControl } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { CustomFormLabel, CustomSelect } from "@edwire/edx-portal-shared"

interface APIDocumentationFormProps {
    documentationOptions: string[]
    selectedDocumentation: string
    onSelectDocumentation: (e: ChangeEvent<HTMLSelectElement>) => void
}

const APIDocumentationForm = ({ selectedDocumentation, documentationOptions, onSelectDocumentation }: APIDocumentationFormProps) => {
    return (
        <Flex flexDir='column' w='733px'>
            <FormControl>
                <CustomFormLabel 
                    text="Select Documentation to Load"
                    htmlFor="apiClient" />
                <CustomSelect
                    options={documentationOptions.map(option => ({value: option, text: option}) )}
                    value={selectedDocumentation}
                    onChange={onSelectDocumentation} />
            </FormControl>
        </Flex>
    )
}

export default APIDocumentationForm