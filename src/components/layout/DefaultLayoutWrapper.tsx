import { Flex } from '@chakra-ui/react'
import {
  AppsMenuMoreOption, Content, DefaultLayout, EdxAppConfig, ExternalAppsContext, Footer, NotificationBar, TEEAuthDataContext, TopBar, TopBarLeft, TopBarRight, useAuthActions, useConfig, useNotificationsBar, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect, useState
} from 'react'
import { AuthContextProps } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'
import { Tenant } from '../../core/Tenant.types'
import useTenantService from '../../services/AdminActions/Tenant/TenantService'

interface DefaultLayoutContentProps {
  auth: AuthContextProps
  edxAppConfig: EdxAppConfig
  content: JSX.Element
  notificationBarMessage: string
  isClosingSession: boolean
  onLogout: () => Promise<void>
}

const DefaultLayoutWrapper = ({ content, notificationBarMessage, isClosingSession, onLogout }: DefaultLayoutContentProps) => {
  const { edxAppConfig } = useContext(TEEAuthDataContext)
  const { userProfile } = useContext(UserProfileContext)
  const { externalApps } = useContext(ExternalAppsContext)
  const { getTenants } = useTenantService()
  // const {} = useContext(edxAppConfig)
  const { handleLogIn, handleChangeTenantId } = useAuthActions()
  const { showNotificationsBar, onCloseNotificationsBar } = useNotificationsBar({ show: true })
  const navigate = useNavigate()
  const [ tenants, setTenants ] = useState<Tenant[]>([])

  useEffect(() => {
    const fetchTenants = async () => {
      const tenants = await getTenants()
      setTenants(tenants)
    }

    fetchTenants()
  }, [])

  const moreOptions: AppsMenuMoreOption[] = [
    {
      name: 'Account Info',
      url: null 
    },
    {
      name: 'Online Community',
      url: null 
    },
    {
      name: 'Help',
      url: null 
    }
  ]

  const handleLogoClick = () => {
    console.log('Logo clicked', 'edxAppConfig', edxAppConfig)
    navigate('/', { replace: true })
  }

  // console.log('external apps', externalApps)
  const { config } = useConfig()
  return (
    <DefaultLayout
      content={<Content
        marginTop='60px'
        maxW="1400px"
      >
        {content}
      </Content>}
      footer={<Footer 
        imageUrl={config.app.logo ?? ''}
        onClick={handleLogoClick}
      />}
      notificationBar={
        <Flex
          mt='-10px'
          w='full'
        >
          <NotificationBar
            content={notificationBarMessage}
            show={false}
            onClose={onCloseNotificationsBar}
          />
        </Flex>}
      topBar={<TopBar
        leftComponent={<TopBarLeft
          list={externalApps}
          menuOptions={moreOptions}
          onClick={handleLogoClick}
        />}
        rightComponent={tenants && <TopBarRight
          isClosingSession={isClosingSession}
          profileData={userProfile}
          tenants={tenants}
          onChangeTenantId={handleChangeTenantId}
          onLogin={handleLogIn}
          onLogout={onLogout}
        />}
      />}
    />
  )
}

export default DefaultLayoutWrapper