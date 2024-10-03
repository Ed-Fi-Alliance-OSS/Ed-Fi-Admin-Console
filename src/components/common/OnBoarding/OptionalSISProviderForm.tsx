import { Button, Flex, FormControl, Text } from "@chakra-ui/react"
import SISCredentialsField from "./SISCredentialsField"
import SISEndpointsField from "./SISEndpointsField"
import SISProviderConnectionField from "./SISProviderConnectionField"
import { ChangeEvent } from "react"
import { AddIcon } from "@chakra-ui/icons"
import { CustomFormLabel, CustomSelect } from "@edfi/admin-console-shared-sdk"
import { SISProviderConnectionState } from "../../../core/sisProviders/SISProviders.types"
import { EdfiApplicationAuthData } from "../../../core/Edfi/EdfiApplications"
import { SISProvidersOption } from "../../../hooks/adminActions/edfi/useSISProvidersForm.types"

interface OptionalSISProviderFormProps {
    authenticationUrl: string
    resourcesUrl: string
    selectedOptionalProviderId: string,
    source: string,
    optionalSISSources: any[]
    sisProvidersOptionList: SISProvidersOption[]
    connectionState: SISProviderConnectionState
    hasSelectedProvider: boolean
    edfiApplicationAuthData: EdfiApplicationAuthData
    isLoadingCredentials: boolean
    showOptionalForm: boolean
    onShowOptionalForm: () => void
    onChangeOptionalSource: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeOptionalProvider: (e: ChangeEvent<HTMLSelectElement>) => void
    handleChangeCredentials: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeEndpoints: () => void
    handleRegenerateCredentials: () => Promise<void>
    handleRemoveProvider: () => void
}

const OptionalSISProviderForm = ({
    authenticationUrl, 
    resourcesUrl,
    sisProvidersOptionList,
    connectionState,
    hasSelectedProvider,
    edfiApplicationAuthData,
    isLoadingCredentials,
    selectedOptionalProviderId,
    source,
    optionalSISSources,
    showOptionalForm,
    onShowOptionalForm,
    onChangeOptionalProvider,
    onChangeOptionalSource,
    handleChangeCredentials,
    handleChangeEndpoints,
    handleRegenerateCredentials,
    handleRemoveProvider }: OptionalSISProviderFormProps) => {

    return (
        <Flex  
            borderRadius='4px'
            border='1px' 
            borderColor='gray.300' 
            padding='12px'
            flexDir='column' 
            h={showOptionalForm? "auto" : "160px"}
            w='49%'>
                <Text
                    color='blue.500'
                    fontWeight='700'
                    fontSize='20px'
                    fontFamily='Poppins'>Optional: Another Source Provider</Text>
                {!showOptionalForm? <Flex flexDir='column'>
                    <Text fontSize='14px' fontWeight='400' fontFamily='Open sans' mt='8px'>
                        If your District or Charter School uses another source provider (e.g., HR, Finance, Staff), complete another connection flow.
                    </Text>
                    <Button onClick={onShowOptionalForm} variant='primaryBlue600' mt='12px' size='sm' minW='80px' maxW='80px'>
                        <Flex>
                            <AddIcon />
                        </Flex>
                        <Text color='white' ml='5px'>Add</Text>
                    </Button>
                </Flex> : <>
                    <Flex mt='8px'>
                        <CustomFormLabel
                            htmlFor="selectOptionalProvider"
                            text="Select Provider" />
                    </Flex>
                <Flex mt='5px'>
                    <SISProviderConnectionField
                        id="selectOptionalProvider"
                        providerFunction={source}
                        sisProviderOptions={sisProvidersOptionList}
                        selectedProvider={selectedOptionalProviderId}
                        hasSelectedProvider={hasSelectedProvider}
                        connectionState={connectionState}
                        onChangeSISProvider={onChangeOptionalProvider}
                        onRemoveProvider={handleRemoveProvider} />
                </Flex> 
                <Flex mt={!hasSelectedProvider? "12px" : "0"}>
                    { !hasSelectedProvider && <FormControl w='300px'>
                        <CustomFormLabel 
                            htmlFor="providerFunction"
                            text="Source Provider Function" />
                        <CustomSelect
                            id="providerFunction"
                            value={source}
                            options={optionalSISSources}
                            onChange={onChangeOptionalSource} />
                    </FormControl> }
                </Flex>
                <Flex bg='gray.300' my='24px' h='1px' w='full' />
                <Flex flexDir='column' mt='0px'>
                    <Text
                        fontSize='18px'
                        fontWeight='700'
                        fontFamily='Poppins'>Credentials</Text>
                    <SISCredentialsField
                        credentialsKey={edfiApplicationAuthData.key ?? ""}
                        credentialsSecret={edfiApplicationAuthData.secret ?? ""}
                        isLoadingCredentials={isLoadingCredentials}
                        regenerateCredentialsDisabled={!hasSelectedProvider}
                        onChangeCredentials={handleChangeCredentials}
                        onRegenerateCredentials={handleRegenerateCredentials} />
                    <Flex bg='gray.300' my='24px' h='1px' w='full' />
                    <Text
                        fontSize='18px'
                        fontWeight='700'
                        fontFamily='Poppins'>Endpoints</Text>
                    <SISEndpointsField
                        edfiAuthtenticationUrl={authenticationUrl}
                        edfiResourcesUrl={resourcesUrl}
                        onChangeEndpoints={handleChangeEndpoints} />
                    <Flex bg='gray.300' my='24px' h='1px' w='full' />
                    <Text
                        fontSize='18px'
                        fontWeight='700'
                        fontFamily='Poppins'>Steps to Connect</Text>
                    <Flex mt='16px'>
                        <Text 
                            fontFamily='Open sans'
                            size='sm'>
                               For help connecting, reach out to your source provider's support services or read through their provided documentation.
                        </Text>
                    </Flex>
                </Flex>
                </>}
        </Flex>
    )
}

export default OptionalSISProviderForm