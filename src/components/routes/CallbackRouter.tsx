// import { useNavigate } from 'react-router-dom'
import { useAuth, useConfig, useInitialRoute } from '@edfi/admin-console-shared-sdk'
import routes from '../../core/routes'
import { useEffect } from 'react'

const CallbackRouter = () => {
  const auth = useAuth()
  const { getInitialPath } = useInitialRoute()
  // const navigate = useNavigate()
  const {config} = useConfig()

  const selectRedirect = () => getInitialPath() ?? routes.home.url
  useEffect(() => {
    if (auth.isAuthenticated) {
      // if the auth is authenticated, redirect to the initial path
      try {
        const redirect = selectRedirect()
        console.log('🚁 Redirecting from Callback to', redirect)
        if(redirect.charAt(0) === '/') { 
          window.location.assign(redirect)
        }
        else {
          window.location.replace(config.app.basePath)
        }
      } catch(e) {
        console.error(e)
        // If we can't navigate, just log the error
        window.location.assign(config.app.basePath)
        // navigate(config.auth.postLogoutRedirectUri, {replace: true})
      }
    }

  }, [auth])
  // return <Navigate to={selectRedirect()} replace={true} />

  return null
}

export default CallbackRouter