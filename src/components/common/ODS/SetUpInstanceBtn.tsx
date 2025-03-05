// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex 
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import useRedirectToSetUpWizard from '../../../hooks/odsInstances/useRedirectToSetUpPage'
import SetUpInstanceControlBtnPopover from './SetUpInstanceControlBtnPopover'

interface SetUpInstanceBtnProps {
    instance: ODSInstance
    updatingIsDefault: UpdatingIsDefaultStatus
    onOpenSetUpModal: (instanceId: string) => void
}

const SetUpInstanceBtn = ({ instance, updatingIsDefault, onOpenSetUpModal }: SetUpInstanceBtnProps) => {
  const { onRedirectToSetupWizard } = useRedirectToSetUpWizard()

  return (
    <Flex w='80px'>
      <Button 
        borderRadius='4px 0px 0px 4px'
        isDisabled={updatingIsDefault.loading}
        minW='67px'
        size='xs'
        variant='primaryBlue500'
        onClick={() => onRedirectToSetupWizard(instance)}
      >
        Set Up
      </Button>

      <SetUpInstanceControlBtnPopover
        instance={instance}
        updatingIsDefault={updatingIsDefault}
        onOpenSetUpModal={onOpenSetUpModal}
      />
    </Flex>
  )
}

export default SetUpInstanceBtn