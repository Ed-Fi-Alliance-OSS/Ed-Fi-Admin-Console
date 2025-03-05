// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import useEdFiConnectionForm from '../../../hooks/edfi/useEdFiConnectionForm'
import {
  EdFiConnectionFormData, EdFiConnectionFormMode 
} from '../../../hooks/edfi/useEdFiConnectionForm.types'
import ModalForm from '../ModalForm'
import EdFiConnectionForm from './EdFiConnectionForm'
import EdFiEditConnectionFormHeader from './EdFiConnectionFormHeader'

interface EdFiEditConnectionFormProps {
    mode: EdFiConnectionFormMode
    initialData?: EdFiConnectionFormData
    onAfterEdit: () => void
    onConfirmClose: () => void
    onClose: () => void
}

const EdFiModalContentConnectionForm  = ({ mode, initialData, onClose, onConfirmClose }: EdFiEditConnectionFormProps) => {
  const { formData, 
    isSaving,
    verificationStatus,
    isVerifying,
    errors,
    onInputChange,
    isDisabledSave,
    isDisabledVerification,
    onVerifyConnection,
    onSave } = useEdFiConnectionForm({
    initialData,
    mode,
    inOnboarding: false 
  })

  const onSaveChanges = async () => {
    await onSave()

    if (verificationStatus === 'Connected') {
      onClose()
    }
  }

  return (
    <ModalForm
      content={<EdFiConnectionForm
        disabledVerification={!isDisabledVerification()}
        errors={errors}
        formData={formData}
        inOnboarding={false}
        isSaving={isSaving}
        isverifying={isVerifying}
        mode={mode}
        verificationStatus={verificationStatus}
        onInputChange={onInputChange}
        onVerifyConnection={onVerifyConnection}
      />}
      header={<EdFiEditConnectionFormHeader
        isDisabled={isDisabledSave()}
        isSaving={false}
        onAction={onSaveChanges}
        onClose={onConfirmClose}
      />}
      height='auto'
      width="512px"
    />
  )
}

export default EdFiModalContentConnectionForm