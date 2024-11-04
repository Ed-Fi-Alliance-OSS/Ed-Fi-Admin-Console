import { useNavigate } from 'react-router-dom'
import { ODSInstance } from '../../core/ODSInstance.types'
import routes from '../../core/routes'
import useOdsInstanceYear from './useOdsInstanceYear'

const useRedirectToSetUpWizard = () => {    
  const { getInstanceYear } = useOdsInstanceYear()
  const navigate = useNavigate()

  const onRedirectToSetupWizard = (instance: ODSInstance) => {
    navigate(`${routes.setUpWizard.url}/${getInstanceYear(instance)}`)
  }

  return {
    onRedirectToSetupWizard
  }
}

export default useRedirectToSetUpWizard