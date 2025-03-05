// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ConsoleModal from '../ConsoleModal'
import AddAPIClientForm from './AddAPIClientForm'
import AddAPIClientFormContent from './AddAPIClientFormContent'
import AddAPIClientFormHeader from './AddAPIClientFormHeader'

interface AddAPIClientModalProps {
    show: boolean
    onClose: () => void
}

const AddAPIClientModal = ({ show, onClose }: AddAPIClientModalProps) => {
  return (
    <ConsoleModal
      content={<AddAPIClientForm
        content={<AddAPIClientFormContent />} 
        header={<AddAPIClientFormHeader onClose={onClose} />}
      />}
      show={show}
      onClose={onClose}
    />
  )
}

export default AddAPIClientModal