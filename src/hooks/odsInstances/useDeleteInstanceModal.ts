// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'
import { ODSInstance } from '../../core/ODSInstance.types'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'
import { ChangeEvent } from 'react'

const useDeleteIntanceModal = (instanceData: ODSInstance) => {
  const [showErrorDeleteInstanceModal, setShowErrorDeleteIntanceModal] = useState(false)
  const [showValidationErrorDeleteInstanceModal, setShowValidationErrorDeleteIntanceModal] = useState(false)

  const [instanceNameToDelete, setInstanceName] = useState('')

  const {
    deleteInstanceById
  } = useOdsInstanceService()

  const onConfirmDeleteInstanceModal = async () => {
    //call the endpoint to delete an instance
    let result = false;
    if (instanceNameToDelete === instanceData.name) {
      result = await deleteInstanceById(instanceData.id.toString())
        .then(async () => {
          setShowErrorDeleteIntanceModal(false)
          setShowValidationErrorDeleteIntanceModal(false)
          return true
        })
        .catch((reason) => {
          setShowErrorDeleteIntanceModal(true)
          console.error(reason)
          return false
        })
    }
    else {
      //show validation error
      setShowValidationErrorDeleteIntanceModal(true)
    }
    return result
  }

  const onChangeInstanceName = (event: ChangeEvent<HTMLInputElement>) => {
    setInstanceName(event.target.value)
    setShowValidationErrorDeleteIntanceModal(false)
  }

  const onResetDeleteInstanceModal = () => {
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