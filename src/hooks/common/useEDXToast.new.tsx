// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ReactNode } from 'react'
import { EDXToastContent } from './EDXToast.types'
import { toaster } from '../../components/ui/toaster'

const useEDXToast = (initialDuration?: number) => {
  // Use the custom toaster defined in the application
  const duration = initialDuration ?? 5000
  
  const successToast = (content: EDXToastContent) => {
    let description: ReactNode = content
    
    return toaster.create({
      title: 'Success',
      description: description,
      duration: duration,
      type: 'success',
      isClosable: true,
    })
  }
  
  const errorToast = (content: EDXToastContent) => {
    let description: ReactNode = content
    
    return toaster.create({
      title: 'Error',
      description: description,      duration: duration,
      type: 'error',
      isClosable: true,
    })
  }

  return {
    successToast,
    errorToast
  }
}

export default useEDXToast
