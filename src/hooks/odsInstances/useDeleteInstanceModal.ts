// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'
import { ODSInstance } from '../../core/ODSInstance.types'
import useOdsInstanceData from '../../hooks/odsInstances/useOdsInstanceData'
import { ChangeEvent } from 'react'
import useEDXToast from '../../hooks/common/useEDXToast'

const useDeleteIntanceModal = (instanceData: ODSInstance) => {
  const { successToast, errorToast } = useEDXToast()
  const [ showErrorDeleteInstanceModal, setShowErrorDeleteIntanceModal ] = useState(false)
  const [ showValidationErrorDeleteInstanceModal, setShowValidationErrorDeleteIntanceModal ] = useState(false)

  const [ instanceNameToDelete, setInstanceName ] = useState('')

  const {  
    deleteInstanceById 
  } = useOdsInstanceData({instanceId: instanceData.id.toString()})

  const onConfirmDeleteInstanceModal = () => {
    console.log(instanceNameToDelete)
    console.log(instanceData.name)
    //call the endpoint to delete an instance
    if ((instanceNameToDelete === instanceData.name))
    {
      deleteInstanceById(instanceData.id.toString())
      .then(() => {
        setShowErrorDeleteIntanceModal(true)
        return successToast("The Instance has been set 'Pending to delete'. Wait for the instance management worker to process the request")
      })
      .catch((reason) => {
        setShowErrorDeleteIntanceModal(true)
        //show toast
        return errorToast("Error trying to delete the instance")
      })
    }
    else 
    {
      //show validation error
      setShowValidationErrorDeleteIntanceModal(true)
      return errorToast("Error trying to delete the instance")
    }
  }

  const onChangeInstanceName = (event: ChangeEvent<HTMLInputElement>) => {
    setInstanceName(event.target.value)
    setShowValidationErrorDeleteIntanceModal(false)
  }

  const onResetDeleteInstanceModal = () => 
  {
    setShowErrorDeleteIntanceModal(false);
    setInstanceName('')
    setShowValidationErrorDeleteIntanceModal(false)
  }

  return {
    instanceNameToDelete,
    showErrorDeleteInstanceModal,
    showValidationErrorDeleteInstanceModal,
    onChangeInstanceName,
    onConfirmDeleteInstanceModal,
    onResetDeleteInstanceModal
  }
}

export default useDeleteIntanceModal