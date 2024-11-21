import {
  Flex, FormControl 
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSelect, CustomInput 
} from '@edfi/admin-console-shared-sdk'
import APIClientSubscriptionsForm from './APIClientSubscriptionsForm'

const AddAPIClientFormContent = () => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <FormControl>
        <CustomFormLabel 
          htmlFor='clientName' 
          text='Client Name'
        />

        <CustomInput
          id="clientName"
          value=''
          onChange={() => null}
        />
      </FormControl>

      <Flex mt='24px'>
        <FormControl>
          <CustomFormLabel 
            htmlFor='expirtationDate' 
            text='Select Expiry Date for API Secret'
          />

          <CustomSelect
            options={[
              {
                value: 'Date Two',
                text: 'Date One' 
              }
            ]}
            value=''  
            onChange={() => null}
          />
        </FormControl>
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='40px'
        w='full'
      >
        <APIClientSubscriptionsForm />
      </Flex>
    </Flex>
  )
}

export default AddAPIClientFormContent