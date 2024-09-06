import { Flex, FormControl } from "@chakra-ui/react"
import usePartnerForm from "../../../hooks/adminActions/edfi/usePartnerForm"
import { CustomFormLabel, CompleteFormErrorMessage, CustomInput } from "@edwire/edx-portal-shared"
import EdFiModalForm from "./EdFiModalForm"

interface PartnerFormProps {
    schoolYear: number 
    mode: 'add' | 'edit'
    onFinishSave: () => void
}

const PartnerForm = ({ schoolYear, mode, onFinishSave }: PartnerFormProps) => {
    const { 
        partnerData, 
        isSaving,
        errors,
        hasTriedSubmit,
        onChangeParnerData,
        onSave 
    } = usePartnerForm({ 
            schoolYear,
            onFinishSave 
        })

    return (
        <EdFiModalForm
            actionText="save"
            headerText={mode === 'add'? 'Add Partner' : 'Edit Partner'}
            isSaving={isSaving}
            onSave={onSave}
            onClose={onFinishSave} 
            content={<Flex w='full'>
                    <Flex flexDir='column' w='full'>
                        { Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage /> }
                        <Flex flexDir='column' w='full'>
                            <FormControl>
                                <CustomFormLabel
                                    text="Partner Name" 
                                    htmlFor="partnerName"/>
                                <CustomInput 
                                    id="partnerName"
                                    error={errors && errors["partnerName"] && errors["partnerName"].message}
                                    value={partnerData.company}
                                    onChange={onChangeParnerData} />
                            </FormControl>
                            <FormControl mt='24px'>
                                <CustomFormLabel
                                    text="Namespace Prefixes" 
                                    htmlFor="namespacePrefixes"/>
                                <Flex flexDir='column' w='full'>
                                    <CustomInput 
                                        id="namespacePrefixes"
                                        error={errors && errors["namespacePrefixes"] && errors["namespacePrefixes"].message}
                                        value={partnerData.namespacePrefixes} 
                                        onChange={onChangeParnerData} />
                                </Flex>
                            </FormControl>
                        </Flex>
                    </Flex>
                </Flex>} />
    )
}

export default PartnerForm