import { Flex, Spinner, Text } from "@chakra-ui/react"
import { SubscriptionOption } from "../../../hooks/adminActions/users/useCreateUserForm.types"
import { CustomFormLabel, CustomSelect, CustomSwitch } from "@edwire/edx-portal-shared"

interface AppUserSubscriptionsFormProps {
    subscriptionsList: SubscriptionOption[]
    isFetchingProfile: boolean 
    isImplicit: (applicationId: string) => boolean
    onSubscriptionToggle: (applicationId: string, subscriptionId: string) => void
    onSelectRoleForUser: (subscriptionId: string, role: string) => void
}

const AppUserSubscriptionsForm = ({ subscriptionsList, isImplicit, isFetchingProfile, onSubscriptionToggle, onSelectRoleForUser }: AppUserSubscriptionsFormProps) => {
    const selectRoleOptions = (subscription: SubscriptionOption) => {
        if (subscription.roles) {
            const roles = subscription.roles.filter(option => option.isAvailableForTenant).map(option => ({ value: option.roleName, text: option.roleName.split(".")[1] }))
            roles.unshift({ value: '', text: 'Select' })

            return roles
        }

        return []
    }

    return (
        <Flex flexDir='column' w='full'>
            { isFetchingProfile && <Flex justifyContent='center' mt='12px' w='full'>
                <Spinner color='blue.600' size='xl' /> 
            </Flex>}
            { !isFetchingProfile && <Flex 
                flexDir='column' 
                padding='10px'
                w='full'>
                    {subscriptionsList.map((subscription, index) => 
                        <Flex 
                            key={index}
                            borderRadius='4px'
                            border='1px'
                            borderColor='gray.300'
                            alignItems='center'
                            _notFirst={{ mt: '16px' }}
                            padding='8px'
                            w='full'>
                                <label htmlFor='' hidden={true}></label>
                                <CustomSwitch 
                                    id={subscription.applicationName}
                                    isChecked={subscription.checked} 
                                    isDisabled={isImplicit(subscription.applicationId)}
                                    onCheck={() => onSubscriptionToggle(subscription.applicationId, subscription.subscriptionId)} />
                                <Flex flexDir='column' ml='16px'>
                                    <Flex w='full'>
                                        <Text
                                            color='blue.600'
                                            fontFamily='Open sans'
                                            fontWeight='700'
                                            size='sm'
                                            lineHeight='22px'>{subscription.applicationName}</Text>
                                        { isImplicit(subscription.applicationId) && <Text 
                                            color='blue.900'
                                            fontWeight='bold'
                                            borderRadius='4px'
                                            fontFamily='Open sans'
                                            fontSize='12px'
                                            padding='1px 5px'
                                            border="1px"
                                            borderColor='blue.600'
                                            ml='6px'>
                                                Implicit
                                            </Text>}
                                    </Flex>
                                    <Text
                                        color='gray.700'
                                        fontFamily='Open sans'
                                        fontWeight='400'
                                        size='xs'
                                        lineHeight='16px'>{`${subscription.assignedLicenses} out of ${subscription.numberOfLicenses === -1? 'Unlimited' : subscription.numberOfLicenses} assigned`}</Text>
                                </Flex>
                                {subscription.checked && subscription.roles && <Flex  
                                    ml='auto'
                                    w='133px'>
                                      <CustomSelect 
                                        id={`${subscription.applicationName}-roles`}
                                        options={selectRoleOptions(subscription)}
                                        value={subscription.selectedRole}
                                        disabled={isImplicit(subscription.applicationId)}
                                        onChange={e => onSelectRoleForUser(subscription.subscriptionId, e.target.value)} />
                                </Flex>}
                        </Flex>
                    )}
            </Flex> }
        </Flex>
    )
}   

export default AppUserSubscriptionsForm