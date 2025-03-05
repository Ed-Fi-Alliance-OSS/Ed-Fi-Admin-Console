// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ModalFormHeader from '../ModalFormHeader'

interface EdFiModalFormHeaderProps {
    actionText: string 
    headerText: string 
    isSaving: boolean 
    isDisabled: boolean 
    onAction: () => void
    onClose: () => void
}

const EdFiModalFormHeader = ({ actionText, headerText, isSaving, isDisabled, onAction, onClose }: EdFiModalFormHeaderProps) => {
  return (
    <ModalFormHeader
      actionText={actionText}
      headerText={headerText}
      headerWidth="200px"
      isDisabled={isDisabled}
      isSaving={isSaving}
      onAction={onAction}
      onClose={onClose}
    />
  )
}

export default EdFiModalFormHeader