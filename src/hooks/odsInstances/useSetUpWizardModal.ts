// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'

const useSetUpWizardModal = () => {
  const [ showSetUpWizardModal, setShowSetUpWizardModal ] = useState(false)
  const onShowSetUpWizardModal = () => setShowSetUpWizardModal(true)
  const onCloseSetUpWizardModal = () => setShowSetUpWizardModal(false)

  return {
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal
  }
}

export default useSetUpWizardModal