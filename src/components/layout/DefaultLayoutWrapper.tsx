import { Flex } from '@chakra-ui/react'
import {
  AppsMenuMoreOption, Content, DefaultLayout, EdxAppConfig, ExternalAppsContext, Footer, NotificationBar, TEEAuthDataContext, TopBar, TopBarLeft, TopBarRight, useAuthActions, useConfig, useNotificationsBar, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { AuthContextProps } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'

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
  // const {} = useContext(edxAppConfig)
  const { handleLogIn, handleChangeTenantId } = useAuthActions()
  const { showNotificationsBar, onCloseNotificationsBar } = useNotificationsBar({ show: true })
  const navigate = useNavigate()

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
        rightComponent={<TopBarRight
          isClosingSession={isClosingSession}
          profileData={userProfile}
          onChangeTenantId={handleChangeTenantId}
          onLogin={handleLogIn}
          onLogout={onLogout}
        />}
      />}
    />
  )
}

export default DefaultLayoutWrapper