import {
  Flex, FormControl, Text 
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSelect, CustomInput, CustomSwitch 
} from '@edfi/admin-console-shared-sdk'
import { Subscription } from '../../../core/Subscription.types'
import { UserSubscriber } from '../../../hooks/adminActions/subscriptions/useManageSubscribersForm.types'
import { ChangeEvent } from 'react'
import { SubscriptionRoleOption } from '../../../hooks/adminActions/subscriptions/useManageSubscribersForm'

interface ManageSubscribersFormContentProps {
    selectedSubscription: Subscription | null
    searchText: string 
    subscriptionRoleOptions: SubscriptionRoleOption[]
    usersList: UserSubscriber[]
    onSelectRoleForUser: (userId: string, role: string) => void
    onToggleSubscription: (userId: string) => void
    onSearchUser: (e: ChangeEvent<HTMLInputElement>) => void
}

const ManageSubscribersFormContent = ({ selectedSubscription, subscriptionRoleOptions, usersList, searchText, onSearchUser, onSelectRoleForUser, onToggleSubscription }: ManageSubscribersFormContentProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Text
        fontFamily='Poppins'
        fontWeight='700'
        size='lg'
      >
        {selectedSubscription? selectedSubscription.applicationName : ''}
      </Text>

      <FormControl mt='16px'>
        <CustomFormLabel
          htmlFor="userName"
          text="Search for User"
        />

        <CustomInput 
          id="userName"
          value={searchText}
          onChange={onSearchUser}
        />
      </FormControl>

      <Flex 
        bg='gray.300'
        borderColor='gray.300'
        h='1px'
        mt='25px' 
        w='full'
      />

      <Flex
        data-testid="subscribers-list"
        flexDir='column'
        mt='30px'
      >
        {usersList.filter(user => user.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())).map((user, index) => 
          <Flex
            key={index}
            _notFirst={{ mt: '16px' }}
            alignItems='center'
            border='1px'
            borderColor='gray.300'
            borderRadius='4px'
            h='53px' 
            padding='8px'
            w='full'
          >
            <CustomSwitch 
              id="manageSubscribers"
              isChecked={user.subscribed}
              onCheck={() => onToggleSubscription(user.userId)}
            />

            <Flex
              flexDir='column'
              ml='15px'
              w='240px'
            >
              <Text
                color='blue.600'
                fontFamily='Open sans'
                fontWeight='700'
                size='md'
              >{user.name}
              </Text>

              <Text
                color='gray.700'
                fontFamily='Open sans'
                fontWeight='400'
                size='sm'
              >{user.email}
              </Text>
            </Flex>

            {user.subscribed && <Flex  
              ml='auto'
              w='133px'
            >
              <CustomSelect 
                options={subscriptionRoleOptions.map(option => ({
                  value: option.roleName,
                  text: option.roleName.split('.')[1] 
                }))}
                value={user.selectedRole}
                onChange={(e) => onSelectRoleForUser(user.userId, e.target.value)}
              />
            </Flex>}
          </Flex>)}
      </Flex>
    </Flex>
  )
}

export default ManageSubscribersFormContent