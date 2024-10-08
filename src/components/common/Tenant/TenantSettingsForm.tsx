import { Button, Flex, FormControl } from "@chakra-ui/react"
import { CustomFormLabel, CustomSwitch, CustomInput } from "@edfi/admin-console-shared-sdk"
import DomainSelect from "./DomainSelect"

const domains = [
    'edwire.com',
    'ewconsultant.net'
]

const TenantSettingsForm = () => {
    return (
        <form style={{ display: 'flex', width: '100%' }}>
            <Flex flexDir='column' w='full'>
                    <FormControl>
                        <CustomFormLabel 
                            text="Organization Name"
                            htmlFor="organizationName" />
                        <CustomInput
                            id='organizationName'
                            value='Grand Bend ISD'
                            onChange={() => null} />
                    </FormControl>

                    <Flex mt='16px'>
                        <FormControl>
                            <CustomFormLabel 
                                text="Organization ID"
                                htmlFor="organizationId" />
                            <CustomInput
                                id='organizationId'
                                value='255901'
                                onChange={() => null} />
                        </FormControl>
                    </Flex>

                    <Flex mt='16px'>
                        <FormControl>
                            <CustomFormLabel 
                                text="Organization Type"
                                htmlFor="organizationType" />
                            <CustomInput
                                id='organizationType'
                                value='LEA'
                                onChange={() => null} />
                        </FormControl>
                    </Flex>

                    <Flex mt='16px'>
                        <FormControl>
                            <CustomFormLabel 
                                text="Tenant ID"
                                htmlFor="organizationType" />
                            <CustomInput
                                id='organizationType'
                                value='00000000-0000-0000-0000-000000000001'
                                onChange={() => null} />
                        </FormControl>
                    </Flex>

                    <Flex mt='16px'>
                        <FormControl>
                            <CustomFormLabel 
                                text="State"
                                htmlFor="state" />
                            <CustomInput
                                id='state'
                                value='Tx'
                                onChange={() => null} />
                        </FormControl>
                    </Flex>

                    <Flex mt='16px'>
                        <FormControl>
                            <CustomFormLabel 
                                text="Is Demo"
                                htmlFor="isDemo" />
                            <CustomSwitch
                                id="toggleTenant"
                                isChecked={false} />
                        </FormControl>
                    </Flex>

                    <Flex mt='16px'>
                        <FormControl>
                            <CustomFormLabel 
                                text="Domains"
                                htmlFor="domains" />
                            <DomainSelect domains={domains} />
                        </FormControl>
                    </Flex>
                    <Flex mt='32px'>
                        <Button 
                            variant='primaryBlue600'
                            size='lg'
                            w='189px'>
                                Save Edits
                        </Button>
                    </Flex>
            </Flex>
        </form>
    )
}

export default TenantSettingsForm