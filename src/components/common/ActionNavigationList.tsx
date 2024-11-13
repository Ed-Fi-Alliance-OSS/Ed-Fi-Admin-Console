import { RepeatIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { ActionNavigationItem } from '../../core/actionNavigation'
import ActionNavigationCard from './ActionNavigationCard'
import { useConfig } from '@edfi/admin-console-shared-sdk'


const ActionNavigationList = () => {
  const {config} = useConfig()
  const actionNavigationList: ActionNavigationItem[] = [
    { icon: `${config.app.basePath}/assets/people-icon.svg`, name: 'Manage Users' },
    { icon: <RepeatIcon color="#1c3daa" fontSize='32px' /> , name: 'User Sync' },
    { icon: `${config.app.basePath}/assets/settings-icon.svg`, name: 'District/Charter School Settings' },
    { icon: `${config.app.basePath}/assets/unlock-icon.svg`, name: 'SSO' },
    { icon: `${config.app.basePath}/assets/code-icon.svg`, name: 'Documentation (Advanced)' }
  ]
  const adminConfig = useContext(adminConsoleContext)

  const selectItems = (item: ActionNavigationItem) => {
    if (item.name === 'Documentation (Advanced)') {
      if (adminConfig && adminConfig.showAdvancedTabs) 
        return true 
            
      return false
    }

    return true
  }

  return (
    <Flex mt='16px' justifyContent='space-between' w='full'>
      {actionNavigationList.filter(item => selectItems(item)).map((item, index) => 
        <ActionNavigationCard 
          data={item} 
          key={item.name} 
          index={index} />
      )}
    </Flex>
  )
}

export default ActionNavigationList