// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'

const useDeleteIntanceBtn = () => {
  const [ showDeleteInstanceModal, setShowDeleteIntanceModal ] = useState(false)
  const onShowDeleteInstanceModal = () => setShowDeleteIntanceModal(true)
  const onCloseDeleteIntanceModal = () => setShowDeleteIntanceModal(false)

  return {
    showDeleteInstanceModal,
    onShowDeleteInstanceModal,
    onCloseDeleteIntanceModal
  }
}

export default useDeleteIntanceBtn