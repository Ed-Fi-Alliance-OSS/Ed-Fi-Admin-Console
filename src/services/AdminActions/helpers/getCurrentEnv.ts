import { EdxAppConfig } from '@edfi/admin-console-shared-sdk'
import { AdminActionsAPISource } from '../sourceEndpoint'

const getCurrentEnv = (config: EdxAppConfig): AdminActionsAPISource => {
  if (config.auth.postLogoutRedirectUri) {
    if (config.auth.postLogoutRedirectUri.includes('localhost')) {
      return 'local'
    }
    
    if (config.auth.postLogoutRedirectUri.includes('dev')) {
      return 'dev'
    }

    return 'prod'
  }

  return 'local'
}

export default getCurrentEnv