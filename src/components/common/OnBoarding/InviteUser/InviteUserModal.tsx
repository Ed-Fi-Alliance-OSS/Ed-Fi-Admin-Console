// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ConsoleModal from '../../ConsoleModal'
import InviteUserForm from './InviteUserForm'

interface InviteUserModalProps {
    show: boolean 
    onAfterAction: () => void
    onClose: () => void
}

const InviteUserModal = ({ show, onAfterAction, onClose }: InviteUserModalProps) => {
  return (
    <ConsoleModal
      content={<InviteUserForm 
        onAfterAction={onAfterAction}
        onClose={onClose}
      />}
      show={show}
      onClose={onClose}
    />
  )
}

export default InviteUserModal