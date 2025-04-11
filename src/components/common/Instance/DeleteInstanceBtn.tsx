// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { DeleteIcon } from '@chakra-ui/icons'
import {
  Button, Text, Box
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import DeleteInstanceModal from './DeleteInstanceModal'

interface DeleteInstanceBtnProps {
    instance: ODSInstance,
    showDeleteInstanceModal: boolean,
    onShowDeleteInstanceModal: () => void,
    onCloseDeleteIntanceModal: () => void
}

const checkInstanceStatus = (instance: ODSInstance) => {
  if (instance.status === 'Completed')
    return 'flex'
  else
    return 'none'
}

const DeleteInstanceBtn = ({ instance, showDeleteInstanceModal, onShowDeleteInstanceModal, onCloseDeleteIntanceModal }: DeleteInstanceBtnProps) => {

  return (
    <Box display={checkInstanceStatus(instance)}>
      <Button
        alignItems='center'
        variant='solid'
        colorScheme='red'
        border='red.600'
        display='flex'
        maxW='auto'
        minW='auto'
        padding='5'
        w='170px'
        onClick={onShowDeleteInstanceModal}
      >
        <DeleteIcon
          aria-hidden="true"
          color='white.600'
          focusable="false"
          fontSize='15px'
        />

        <Text
          color='white.600'
          fontFamily='Poppins'
          fontWeight='400'
          ml='5px'
          size='md'
        >Delete Instance
        </Text>
      </Button>

      {instance && <DeleteInstanceModal
        instance={instance}
        show={showDeleteInstanceModal}
        onCloseModal={onCloseDeleteIntanceModal}
      />}
    </Box>
  )
}

export default DeleteInstanceBtn