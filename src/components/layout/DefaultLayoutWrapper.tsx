import { useContext } from 'react'
import { AuthContextProps } from 'react-oidc-context'
import { AppsMenuMoreOption, EdxAppConfig, Content, DefaultLayout, ExternalAppsContext, Footer, NotificationBar, TopBar, TopBarLeft, TopBarRight, useAuthActions, useNotificationsBar, UserProfileContext, TEEAuthDataContext } from '@edfi/admin-console-shared-sdk'
import { useNavigate } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

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
    const { handleLogIn, handleChangeTenantId } = useAuthActions()
  const { showNotificationsBar, onCloseNotificationsBar } = useNotificationsBar({ show: true })
  const navigate = useNavigate()

  const moreOptions: AppsMenuMoreOption[] = [
    { name: 'Account Info', url: null },
    { name: 'Online Community', url: null },
    { name: 'Help', url: null }
  ]

  const handleLogoClick = () => {
    console.log('Logo clicked')
    console.log('edxAppConfig', edxAppConfig)
    // navigate('/', { replace: true })
  }

  // console.log('external apps', externalApps)

    return (
        <DefaultLayout
            topBar={<TopBar 
                leftComponent={<TopBarLeft 
                    list={externalApps}
                    menuOptions={moreOptions} />}
                rightComponent={<TopBarRight
                   profileData={userProfile}
                   isClosingSession={isClosingSession}
                   onLogin={handleLogIn}
                   onLogout={onLogout}
                   onChangeTenantId={handleChangeTenantId} />} />}
            notificationBar={
                <Flex mt='-10px' w='full'>
                    <NotificationBar 
                        show={false}
                        onClose={onCloseNotificationsBar} 
                        content={notificationBarMessage} />
                </Flex>}
            content={<Content 
                marginTop='60px'
                maxW="1400px">
                    { content }
                </Content>}
            footer={<Footer />} />
    )
}

export default DefaultLayoutWrapper