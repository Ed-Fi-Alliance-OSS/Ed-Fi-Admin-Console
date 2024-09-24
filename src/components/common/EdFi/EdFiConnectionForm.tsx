import { Button, Flex, FormControl, Text } from "@chakra-ui/react"
import { CustomFormLabel, CustomInput, CustomSelect } from "@edwire/edx-portal-shared"
import { ChangeEvent } from "react"
import { FormDataErrors } from "../../../core/validation/FormValidations.types"
import { EdFiConnectionFormData, EdFiConnectionFormMode, EdFiConnectionVerificationStatus } from "../../../hooks/edfi/useEdFiConnectionForm.types"
import EdFiConnectionVerification from "./EdFiConnectionVerification"

interface EdFiConnectionFormProps {
    formData: EdFiConnectionFormData
    mode: EdFiConnectionFormMode
    inOnboarding: boolean
    verificationStatus: EdFiConnectionVerificationStatus
    isverifying: boolean 
    disabledVerification: boolean
    isSaving: boolean 
    errors: FormDataErrors
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onVerifyConnection: () => void
}

const EdFiConnectionForm = ({ formData, errors, mode, inOnboarding, verificationStatus, isverifying, disabledVerification, isSaving, onInputChange, onVerifyConnection }: EdFiConnectionFormProps) => {  
    return (
        <Flex flexDir='column' w='full'>
            { inOnboarding && <Flex flexDir='column'>
                <Text
                    fontFamily='Poppins'
                    fontWeight='700'
                    fontSize='18px'>Credentials</Text>
                 <Text
                    fontFamily='Open sans'
                    fontWeight='400'
                    w='500px'>
                        Note: These credentials will be used for both Data Health Check and Data Warehouse as base applications for Acme Service Center. 
                        You will be able to connect other applications within the Tech Console later. When setting up your credentials, 
                        be sure to use the "Read Only (All Resources)" claim set.
                </Text> 
            </Flex>}
            { !inOnboarding && mode === 'Edit' &&  <FormControl mt='16px'>
                <CustomFormLabel 
                    htmlFor='applicationName' 
                    text='Application Name' />
                <CustomSelect
                    id="applicationName"
                    disabled={true}
                    options={[
                        { value: "Data Warehouse", text: "Data Warehouse" }, 
                        { value: "Data Health Check", text: "Data Health Check" }]}
                    value={formData.connectionName ?? ""}
                    onChange={() => console.log('Change application')} />
            </FormControl> }
            <FormControl mt='16px'>
                <CustomFormLabel 
                    htmlFor='baseUrl' 
                    text='Ed-Fi Base URL' />
                <CustomInput 
                    id='baseUrl' 
                    value={formData.baseUrl}
                    disabled={mode === "Edit"? true : false}
                    error={errors && errors["baseUrl"] && errors["baseUrl"].message}
                    onChange={onInputChange} />
            </FormControl>
            <FormControl mt='16px'>
                <CustomFormLabel 
                    htmlFor='key' 
                    text='Key' />
                <CustomInput 
                    id='key' 
                    value={formData.key}
                    error={errors && errors["key"] && errors["key"].message}
                    disabled={isSaving}
                    onChange={onInputChange} />
            </FormControl>
            <FormControl mt='16px'>
                <CustomFormLabel 
                    htmlFor='secret' 
                    text='Secret' />
                <CustomInput 
                    type='password' 
                    id='secret' 
                    value={formData.secret} 
                    error={errors && errors["secret"] && errors["secret"].message}
                    disabled={isSaving}
                    onChange={onInputChange} />
            </FormControl>
            <Flex mt='16px' w='full'>
                <Button
                    onClick={onVerifyConnection}
                    isLoading={isSaving || isverifying}
                    isDisabled={disabledVerification}
                    alignSelf='flex-end'
                    variant='primaryBlue500'
                    size='xs'
                    paddingX='16px'
                    w='auto'
                    minW='25px'>
                        Verify Connection
                </Button>
            </Flex>
            <Flex bg='gray.300' h='1px' my='32px' />
            <EdFiConnectionVerification 
                mode={mode} 
                inOnboarding={inOnboarding}
                status={verificationStatus} />
        </Flex>
    )
}

export default EdFiConnectionForm