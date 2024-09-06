import { ChangeEvent } from 'react'
import { Button, Flex, FormControl } from "@chakra-ui/react"
import { CustomFormLabel, CopyTextBtn, CustomInput } from "@edwire/edx-portal-shared"

interface SISCredentialsFieldProps {
    credentialsKey: string 
    credentialsSecret: string 
    isLoadingCredentials: boolean
    regenerateCredentialsDisabled: boolean
    onChangeCredentials: (e: ChangeEvent<HTMLInputElement>) => void
    onRegenerateCredentials: () => void
}

const SISCredentialsField = ({ credentialsKey, credentialsSecret, isLoadingCredentials, regenerateCredentialsDisabled, onChangeCredentials, onRegenerateCredentials }: SISCredentialsFieldProps) => {
    return (
        <Flex flexDir='column' mt='10px'>
            <FormControl>   
                <CustomFormLabel
                    htmlFor="key"
                    text="Key" />
                <Flex justifyContent='space-between'>
                    <CustomInput
                        id="key"
                        value={credentialsKey}
                        onChange={onChangeCredentials}
                        disabled />
                    <Flex ml='10px'>
                        <CopyTextBtn 
                            value={credentialsKey}
                            withoutBorder={true}/>
                    </Flex>
                </Flex>
            </FormControl>
            <FormControl mt='16px'>
                <CustomFormLabel
                        htmlFor="secret"
                        text="Secret" />
                <Flex justifyContent='space-between'>
                    <CustomInput
                        id="secret"
                        type="password"
                        value={credentialsSecret}
                        onChange={onChangeCredentials}
                        disabled />
                    <Flex ml='10px'>
                        <CopyTextBtn 
                            value={credentialsSecret}
                            withoutBorder={true} />
                    </Flex>
                </Flex>
            </FormControl>
            <Flex justifyContent='flex-start' w='full'>
                <Button
                    color='blue.500'
                    onClick={onRegenerateCredentials}
                    isDisabled={regenerateCredentialsDisabled}
                    fontFamily='Open sans'
                    fontWeight='700'
                    fontSize='16px'
                    padding='0'
                    textAlign='start'
                    mt='10px'
                    w='auto'>
                        {isLoadingCredentials? 'Loading credentials...' : 'Click here to regenerate credentials.'}
                </Button>
            </Flex>
        </Flex>
    )
}

export default SISCredentialsField