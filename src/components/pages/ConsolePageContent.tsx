import { Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import AdminConsoleHeader from '../common/AdminConsoleHeader'
import AdminConsoleTabsMenu from '../common/AdminConsoleTabsMenu'
import DevelopersTabContent from '../common/Developers/DevelopersTabContent'
import DistrictSchoolTabContent from '../common/DistrictSchool/DistrictSchoolTabContent'
import SSOTabContent from '../common/Security/SSOTabContent'
import ManageSubscriptionsTabContent from '../common/Subscriptions/ManageSubscriptionsTabContent'
import ManageUsersTabContent from '../common/User/ManageUsersTabContent'
import UserSyncTabContent from '../common/UserSync/UserSyncTabContent'

const tabsList = [
  'Manage Users',
  // 'Manage Licenses',
  'User Sync',
  'District/Charter School Settings',
  'SSO',
  'Documentation (Advanced)'
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
            <UserSyncTabContent />
            <DistrictSchoolTabContent />
            <SSOTabContent />
            <DevelopersTabContent />
          </AdminConsoleTabsMenu> :
          <AdminConsoleTabsMenu 
            tabsList={tabsList.filter(tab => selectTabs(tab))}
            initialIndex={location.state? location.state.consoleActionIndex : 0} >
            <ManageUsersTabContent />
            <UserSyncTabContent />
            <DistrictSchoolTabContent />
            <SSOTabContent />
          </AdminConsoleTabsMenu> }
      </Flex>
    </Flex>
  )
}

export default ConsolePageContent