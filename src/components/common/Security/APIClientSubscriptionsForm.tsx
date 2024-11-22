import {
  Flex, Text 
} from '@chakra-ui/react'
import {
  CustomSelect, CustomSwitch 
} from '@edfi/admin-console-shared-sdk'

const subscriptions = [
  'Data Sync',
  'Analytics',
  'Ed-Fi Admin',
  'RTI',
  'Validations'
]

const APIClientSubscriptionsForm = () => {
  return (
    <Flex 
      flexDir='column' 
      w='full'
    >
      {subscriptions.map((option, index) => 
        <Flex 
          key={index}
          _notFirst={{ mt: '15px' }}
          alignItems='center'
          border='1px'
          borderColor='gray.300'
          borderRadius='4px'
          justifyContent='space-between'
          padding='12px 10px'
          w='full'
        >
          <Flex alignItems='center'>
            <CustomSwitch 
              id="apiClient"
              isChecked={option === 'Data Sync'? true : false}
            />

            <Text
              color='blue.600'
              fontFamily='Open sans'
              fontWeight='700'
              ml='15px'
              size='sm'
            >
              {option}
            </Text>
          </Flex>  

          {option === 'Data Sync' && 
          <Flex>
            <CustomSelect
              options={[
                {
                  text: 'Data Sync.U...',
                  value: 'Data Sync.U...' 
                }
              ]}
              value='Data Sync.U...'
              onChange={() => null}
            />
          </Flex>}
        </Flex>)}
    </Flex>
  )
}   

export default APIClientSubscriptionsForm