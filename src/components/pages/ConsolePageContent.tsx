import { Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import AdminConsoleHeader from '../common/AdminConsoleHeader'
import AdminConsoleTabsMenu from '../common/AdminConsoleTabsMenu'
import DevelopersTabContent from '../common/Developers/DevelopersTabContent'
import SSOTabContent from '../common/Security/SSOTabContent'
import ManageUsersTabContent from '../common/User/ManageUsersTabContent'

const tabsList = [
  'Manage Users',
  'SSO'
]

const ConsolePageContent = () => {
  const location = useLocation()
  const adminConfig = useContext(adminConsoleContext)

  // console.log('admin config', adminConfig)

  const selectTabs = (tabName: string) => {
    if (tabName === 'Documentation (Advanced)') {
      if (adminConfig && adminConfig.showAdvancedTabs)
        return true

      return false
    }

    return true
  }

  return (
    <Flex flexDir='column' w='full'>
      <AdminConsoleHeader />
      <Flex mt='24px' w='full'>
        { adminConfig && adminConfig.showAdvancedTabs?  
          <AdminConsoleTabsMenu 
            tabsList={tabsList}
            initialIndex={location.state? location.state.consoleActionIndex : 0} >
            <ManageUsersTabContent />
            <SSOTabContent />
            <DevelopersTabContent />
          </AdminConsoleTabsMenu> :
          <AdminConsoleTabsMenu 
            tabsList={tabsList.filter(tab => selectTabs(tab))}
            initialIndex={location.state? location.state.consoleActionIndex : 0} >
            <ManageUsersTabContent />
            <SSOTabContent />
          </AdminConsoleTabsMenu> }
      </Flex>
    </Flex>
  )
}

export default ConsolePageContent