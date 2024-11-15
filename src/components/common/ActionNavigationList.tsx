import { Flex } from '@chakra-ui/react'
import { useConfig } from '@edfi/admin-console-shared-sdk'
import { ActionNavigationItem } from '../../core/actionNavigation'
import ActionNavigationCard from './ActionNavigationCard'


const ActionNavigationList = () => {
  const {config} = useConfig()
  const actionNavigationList: ActionNavigationItem[] = [
    { icon: `${config.app.basePath}/assets/people-icon.svg`, name: 'Manage Users' },
    { icon: `${config.app.basePath}/assets/unlock-icon.svg`, name: 'SSO' }
  ]

  return (
    <Flex mt='16px' justifyContent='start' w='full'>
      {actionNavigationList.map((item, index) => 
        <ActionNavigationCard 
          data={item} 
          key={item.name} 
          index={index} />
      )}
    </Flex>
  )
}

export default ActionNavigationList