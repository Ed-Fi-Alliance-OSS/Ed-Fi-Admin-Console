// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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