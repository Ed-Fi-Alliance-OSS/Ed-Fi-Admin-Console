// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import useOdsInstanceData from '../../hooks/odsInstances/useOdsInstanceData'
import useOdsInstancePageContent from '../../hooks/odsInstances/useOdsInstancePageContent'
import useSetUpWizardModal from '../../hooks/odsInstances/useSetUpWizardModal'
import InstancePageHeader from '../common/Instance/InstancePageHeader'
import InstanceTabsMenu from '../common/Instance/InstanceTabsMenu'

interface InstancePageContentProps {
    instanceId: string  
}

const InstancePageContent = ({ instanceId }: InstancePageContentProps) => {
  const { instance, 
    updatingInstance,
    onSetIsDefault,
    showConfirmSetDefaultModal,
    onShowConfirmSetDefaultModal,
    onCloseConfirmSetDefaultModal } = useOdsInstanceData({ instanceId })

  const {
    showSetUpWizardModal,
    onCloseSetUpWizardModal,
    onShowSetUpWizardModal
  } = useSetUpWizardModal()

  const {
    availableSetDefault
  } = useOdsInstancePageContent({ instance })
    
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <InstancePageHeader />

      <InstanceTabsMenu 
        canSetAsDefault={availableSetDefault}
        instance={instance}
        showConfirmSetDefaultModal={showConfirmSetDefaultModal}
        showSetUpWizardModal={showSetUpWizardModal}
        updatingInstance={updatingInstance}
        onCloseConfirmSetDefaultModal={onCloseConfirmSetDefaultModal}
        onCloseSetUpWizardModal={onCloseSetUpWizardModal} 
        onSetIsDefault={onSetIsDefault} 
        onShowConfirmSetDefaultModal={onShowConfirmSetDefaultModal} 
        onShowSetUpWizardModal={onShowSetUpWizardModal}
      />
    </Flex>
  )
}

export default InstancePageContent