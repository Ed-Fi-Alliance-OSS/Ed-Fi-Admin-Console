// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

//import { useToast } from '@chakra-ui/react'
import EDXToast from '../../components/common/EDXToast'
import { EDXToastContent } from './EDXToast.types'

const useEDXToast = (initialDuration?: number) => {
  /*const toast = useToast({
    position: 'top-right',
    duration: initialDuration ?? 1500
  })*/

  const successToast = (content: EDXToastContent) => {
    return "";/*toast({
      render: () => <EDXToast
        content={content}
        type='Success'
      /> 
    })*/
  }

  const errorToast = (content: EDXToastContent) => {
    return "";/*toast({
      render: () => <EDXToast
        content={content}
        type='Error'
      /> 
    })*/
  }

  return {
    successToast,
    errorToast
  }
}

export default useEDXToast