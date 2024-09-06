import { Flex, Link, Text } from "@chakra-ui/react"
import { EdFiConnectionFormMode, EdFiConnectionVerificationStatus as VerificationStatus } from "../../../hooks/edfi/useEdFiConnectionForm.types"
import EdFiConnectionVerificationError from "./EdFiConnectionVerificationError"
import EdFiConnectionVerificationStatus from "./EdFiConnectionVerificationStatus"

interface EdFiConnectionVerificationProps {
    mode: EdFiConnectionFormMode
    inOnboarding: boolean
    status: VerificationStatus 
}

const EdFiConnectionVerification = ({ mode, inOnboarding, status }: EdFiConnectionVerificationProps) => {
    return (
        <Flex flexDir='column' w='full'>
            <Text
                id="connectionVerificationStatus"
                fontSize='18px'
                fontWeight='700'>Verification Status</Text>
            <Flex mt='12px'>
                { inOnboarding && <Text>
                    The following status must be “Connected” to continue. 
                    If you’ve submitted the credentials above and the status shows an error, 
                    use the error message to troubleshoot or 
                    <Link 
                        href="https://txedexchange.atlassian.net/servicedesk/customer/portals"
                        target="_blank"
                        color='blue.500' 
                        fontFamily='Open sans'
                        ml='4px'>contact support.</Link>
                </Text> }
                { !inOnboarding && <Text>
                    After inputting the credentials above, click “Verify Connection” to see if the connection worked.
                    If the status does not change to “Connected” use the error message to troubleshoot or 
                    <Link 
                        href="https://txedexchange.atlassian.net/servicedesk/customer/portals"
                        target="_blank"
                        color='blue.500'
                        fontFamily='Open sans'
                        mx='4px'>contact support.</Link>
                    Once connection is successful, click “Save” to return. 
                </Text> }
            </Flex>
            <Flex mt='16px'>
                <EdFiConnectionVerificationStatus status={status} />
            </Flex>
            <Flex mt='12px'>
                <EdFiConnectionVerificationError status={status} />   
            </Flex>
        </Flex>

    )
}

export default EdFiConnectionVerification