import { useContext, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import AppRouter from '../routes/AppRouter'
import { 
  SessionInactiveModal, 
  LoadingScreen,
  EdxAppConfig,
  useAuthAutoRefresh, 
  useAuthActions, 
  useLoadingState,
  useIdleSession,
  TEEAuthDataContext,
  AuthContextProps, 
} from '@edfi/admin-console-shared-sdk' 
import { Helmet } from 'react-helmet-async'
import Layout from './Layout'
import simpleLayoutRoutes from '../../core/layoutRoutes'
import useOnBoardingWizard from '../../hooks/useOnBoardingWizard'
import useCheckPermissions from '../../hooks/useCheckPermissions'
import routes from '../../core/routes'
import ErrorPageContainer from '../pages/ErrorPageContainer'

const LayoutWrapper = () => {
  useAuthAutoRefresh()
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const { handleLogOut } = useAuthActions()
  const { loadingState, stateMessage } = useLoadingState()
  const { showInactiveModal, onCloseInactiveModal } = useIdleSession({ timeout: 10000 * 60 })
  const [isClosingSession, setIsClosingSession] = useState(false)
  const { onBoardingWizardData } = useOnBoardingWizard()
  const { finishedCheckedPermissions } = useCheckPermissions()
    
  // console.log("expires in:", auth && auth.user? ((auth.user.expires_in as number) / 60) : 'not defined')
    
  const onLogout = async () => {
    setIsClosingSession(true)
        
    await handleLogOut()
  }

  const currentLoadingStateMessage = () => {
    // if (loadingState !== 'finished') 
    //     return stateMessage

    // if (onBoardingWizardData === null)
    //     return "Loading Tech Console..."

    // if (!finishedCheckedPermissions)
    //     return "Checking permissions..."

    return 'Finished loading...'
  }

  const currentLoadingState = () => {
    // if (window.location.pathname.includes(routes.unauthorized.url))
    //     return false

    // if (loadingState !== 'finished' || onBoardingWizardData === null || !finishedCheckedPermissions)
    //     return true

    return false
  }

    

  return (
    <Flex 
      flexDirection='column' 
      position='relative'
      minH='100vh'
      width='100%'>
      <LoadingScreen 
        state={currentLoadingStateMessage()} 
        delay={1} 
        loading={currentLoadingState()} />
      <Helmet>
        <title>Acme Service Center | {stateMessage}</title>
      </Helmet>
      <SessionInactiveModal
        show={showInactiveModal}
        isClosingSession={isClosingSession}
        onLogout={onLogout}
        onClose={onCloseInactiveModal} />
      {onBoardingWizardData && <Layout 
        auth={auth as AuthContextProps}
        edxAppConfig={edxAppConfig as EdxAppConfig}
        content={<AppRouter />}
        notificationBarMessage='Acme Service Center Online Community is now live! Learn more.'
        simpleLayoutRouteList={simpleLayoutRoutes}
        isClosingSession={isClosingSession} 
        onLogout={onLogout} />}
      {window.location.pathname.includes(routes.unauthorized.url) && <ErrorPageContainer status="403" />}
    </Flex>
  )
}

export default LayoutWrapper