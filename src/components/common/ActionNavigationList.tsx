import { Flex } from '@chakra-ui/react'
import { useConfig } from '@edfi/admin-console-shared-sdk'
import { ActionNavigationItem } from '../../core/actionNavigation'
import ActionNavigationCard from './ActionNavigationCard'


const ActionNavigationList = () => {
  const { config } = useConfig()

  const actionNavigationList: ActionNavigationItem[] = [
    {
      icon: `${config.app.basePath}/assets/people-icon.svg`,
      name: 'Manage Users' 
    },
    {
      icon: `${config.app.basePath}/assets/unlock-icon.svg`,
      name: 'SSO' 
    }
  ]

  return (
    <Flex
      justifyContent='start'
      mt='16px'
      w='full'
    >
      {actionNavigationList.map((item, index) => 
        <ActionNavigationCard 
          key={item.name} 
          data={item} 
          index={index}
        />)}
    </Flex>
  )
}

export default ActionNavigationList