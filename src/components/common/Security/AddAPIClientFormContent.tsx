import { Flex, FormControl } from "@chakra-ui/react"
import { CustomFormLabel, CustomSelect, CustomInput } from "@edwire/edx-portal-shared"
import APIClientSubscriptionsForm from "./APIClientSubscriptionsForm"

const AddAPIClientFormContent = () => {
    return (
        <Flex flexDir='column' w='full'>
            <FormControl>
                <CustomFormLabel 
                    text='Client Name' 
                    htmlFor='clientName' />
                <CustomInput
                    id="clientName"
                    value=''
                    onChange={() => null} />
            </FormControl>
            <Flex mt='24px'>
                <FormControl>
                    <CustomFormLabel 
                        text='Select Expiry Date for API Secret' 
                        htmlFor='expirtationDate' />
                    <CustomSelect
                        value=''
                        options={[{ value: 'Date Two', text: 'Date One' }]}  
                        onChange={() => null} />
                </FormControl>
            </Flex>
            <Flex justifyContent='space-between' mt='40px' w='full'>
                <APIClientSubscriptionsForm />
            </Flex>
        </Flex>
    )
}

export default AddAPIClientFormContent