import { useNavigate } from 'react-router-dom'
import { ODSInstance } from '../../core/ODSInstance.types'
// import useOdsInstanceYear from './useOdsInstanceYear'

const useRedirectToSetUpWizard = () => {    
  // const { getInstanceYear } = 0//useOdsInstanceYear()
  const navigate = useNavigate()

  const onRedirectToSetupWizard = (instance: ODSInstance) => {
    // navigate(`${routes.setUpWizard.url}/${getInstanceYear(instance)}`)
  }

  return { onRedirectToSetupWizard }
}

export default useRedirectToSetUpWizard