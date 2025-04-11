// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, FormControl, Text
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useDeleteInstanceModal from '../../../hooks/odsInstances/useDeleteInstanceModal'
import EDXCustomModal from '../EDXCustomModal'
import useEDXToast from '../../../hooks/common/useEDXToast'
import { useNavigate } from 'react-router-dom'
import routes from '../../../core/routes'
import { CustomInput } from '@edfi/admin-console-shared-sdk'


interface DeleteInstanceModalProps {
  instance: ODSInstance
  show: boolean
  onCloseModal: () => void
}

const DeleteInstanceModal = ({ instance, show, onCloseModal }: DeleteInstanceModalProps) => {
  const {
    showErrorDeleteInstanceModal,
    showValidationErrorDeleteInstanceModal,
    instanceNameToDelete,
    onConfirmDeleteInstanceModal,
    onChangeInstanceName,
    onResetDeleteInstanceModal } = useDeleteInstanceModal(instance)

  const navigate = useNavigate()
  const { successToast, errorToast } = useEDXToast()


  const onConfirm = () => {
    var success = onConfirmDeleteInstanceModal()
    if (success) {
      navigate(`${routes.home.url}`)
      return successToast("The Instance has been set 'Pending to delete'. Wait for the instance management worker to process the request")
    }
    else
    {
      return errorToast("Error trying to delete the instance")
    }
  }

  const onClose = () => {
    onResetDeleteInstanceModal()
    onCloseModal()
  }

  return (
    <EDXCustomModal
      content={<Flex
        flexDir='column'
        mt='12px'
      >
        <FormControl mt='16px'>
          <Text>
            To confirm deletion, type the name of the instance.
          </Text>
          <CustomInput
            id='isntanceName'
            error={showValidationErrorDeleteInstanceModal ? "Error: The Instance name doesn't match" : ''}
            value={instanceNameToDelete}
            onChange={onChangeInstanceName}
          />
        </FormControl>
      </Flex>}
      footer={<Flex
        alignItems='flex-start'
        w='full'
      >
        <Button
          border='1px'
          borderColor='gray.400'
          color='red.600'
          padding='10px'
          size='sm'
          onClick={onClose}
        >
          No
        </Button>

        <Button
          _hover={{ _disabled: { bg: '#DC3625' } }}
          bg='#DC3625'
          border='1px'
          borderColor='#DC3625'
          color='white'
          ml='10px'
          padding='10px'
          size='sm'
          onClick={onConfirm}
        >
          Yes
        </Button>
      </Flex>}
      header="Are you sure?"
      isOpen={show}
      type="alert"
      onClose={onClose}
    />
  )
}

export default DeleteInstanceModal