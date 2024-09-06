import { ChangeEvent } from 'react'
import { CloseIcon } from "@chakra-ui/icons"
import { Button, Flex, FormControl, Text } from "@chakra-ui/react"
import { CustomSelect } from "@edwire/edx-portal-shared"
import RefreshBtn from "../RefreshBtn"
import SISProviderConnectionTag from "./SISProviderConnectionTag"

type SISProviderConnectionState = 'Awaiting Connection' | 'Connected'

interface SISProviderOption {
    value: string 
    text: string 
}

interface SISProviderConnectionFieldProps {
    id: string
    sisProviderOptions: SISProviderOption[]
    providerFunction?: string
    selectedProvider: string 
    hasSelectedProvider: boolean 
    connectionState: SISProviderConnectionState
    onChangeSISProvider: (e: ChangeEvent<HTMLSelectElement>) => void
    onRemoveProvider: () => void
}

const SISProviderConnectionField = ({ id, providerFunction, sisProviderOptions, selectedProvider, hasSelectedProvider, connectionState, onChangeSISProvider, onRemoveProvider }: SISProviderConnectionFieldProps) => {
    if (!hasSelectedProvider) {
        return (
            <FormControl fontFamily='Open sans' w='300px'>
                <CustomSelect
                    id={id}
                    options={sisProviderOptions}
                    value={selectedProvider}
                    onChange={onChangeSISProvider} />
            </FormControl> 
        )
    }

    return (
        <Flex>
            <Text
                bg='gray.100'
                borderRadius='4px'
                color='gray.700'
                fontFamily='Archivo Narrow'
                fontWeight='400'
                size='sm'
                padding='5px 10px'>
                    {`${sisProviderOptions.find(option => option.value === selectedProvider)?.text} ${providerFunction? `(${providerFunction})` : "" }`}
                    <Button
                        onClick={onRemoveProvider}
                        variant='simple'
                        minW='auto'
                        aria-labelledby='close-btn'>
                            <span id="close-btn" hidden>Close</span>
                            <CloseIcon 
                                ml='10px' 
                                fontSize='10px'
                                aria-hidden="true" 
                                focusable="false"  />
                    </Button>
            </Text>
            <Flex ml='10px'>
                <SISProviderConnectionTag status={connectionState} />
            </Flex>
            <Flex alignItems='center'  ml='5px'>
                <RefreshBtn 
                    id="connection-field"
                    onAction={() => console.log('refresh provider connection state...')} />
            </Flex>
        </Flex>
    )
}

export default SISProviderConnectionField