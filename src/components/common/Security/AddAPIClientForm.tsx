// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ModalForm from '../ModalForm'

interface AddAPIClientFormProps {
    header: JSX.Element
    content: JSX.Element
}

const AddAPIClientForm = ({ header, content }: AddAPIClientFormProps) => {
  return (
    <ModalForm
      content={content}
      header={header}
      height='auto'
      width="512px"
    />
  )
}

export default AddAPIClientForm