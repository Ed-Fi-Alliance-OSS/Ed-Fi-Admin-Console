// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdFiConnectionFormData } from '../../../hooks/edfi/useEdFiConnectionForm.types'
import ModalForm from '../ModalForm'
import EdFiModalFormHeader from './EdFiModalFormHeader'

interface EdFiModalFormProps {
    actionText: string 
    headerText: string 
    initialData?: EdFiConnectionFormData
    content: JSX.Element
    isSaving: boolean 
    onSave: () => void
    onClose: () => void
}

const EdFiModalForm  = ({ actionText, headerText, content, isSaving, onSave, onClose }: EdFiModalFormProps) => {
  return (
    <ModalForm
      header={<EdFiModalFormHeader
        actionText={actionText}
        headerText={headerText}
        isDisabled={false}
        isSaving={isSaving}
        onAction={onSave}
        onClose={onClose}
      />}
      content={content}
      height='auto'
      maxHeight="85vh"
      width="512px"
    />
  )
}

export default EdFiModalForm