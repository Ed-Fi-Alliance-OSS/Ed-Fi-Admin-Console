// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Heading
} from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceDescription from '../../../hooks/odsInstances/useOdsInstanceDescription'
import useOdsInstanceEdFiStatus from '../../../hooks/odsInstances/useOdsInstanceEdFiStatus'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'
import useExternalODSData from '../../../hooks/useExternalODSData'
import AdminConsoleTabsMenu from '../AdminConsoleTabsMenu'
import EdFiSettingsTabContent from '../EdFi/EdFiSettingsTabContent'
import ConfirmSetDefaultInstanceModal from '../ODS/ConfirmSetDefaultInstanceModal'
import SetUpInstanceModal from '../ODS/SetUpInstanceModal'
import TabContentWrapper from '../TabContentWrapper'
import DataManagementTabContent from './DataManagementTabContent'
import InstanceLoadingContent from './InstanceLoadingContent'
import InstanceSummaryTabContent from './InstanceSummaryTabContent'
import PartnersAndApplicationTabContent from './PartnersAndApplicationTabContent'

const tabsList = [
  'Summary',
  'Vendors & Applications',
  'Data Management (Advanced)'
]

interface InstanceTabsMenuProps {
  instance: ODSInstance | null
  showConfirmSetDefaultModal: boolean
  showSetUpWizardModal: boolean
  canSetAsDefault: boolean
  updatingInstance: boolean
  onSetIsDefault: (instanceId: string, isDefault: boolean, validate: boolean) => void
  onShowConfirmSetDefaultModal: () => void
  onCloseConfirmSetDefaultModal: () => void
  onCloseSetUpWizardModal: () => void
  onShowSetUpWizardModal: () => void
}

const InstanceTabsMenu = ({ instance, showConfirmSetDefaultModal, showSetUpWizardModal, canSetAsDefault, updatingInstance, onSetIsDefault, onCloseSetUpWizardModal, onShowSetUpWizardModal, onShowConfirmSetDefaultModal, onCloseConfirmSetDefaultModal }: InstanceTabsMenuProps) => {
  const adminConfig = useContext(adminConsoleContext)
  const { getDisplayYear } = useOdsInstanceDisplayYear()
  const { externalODS } = useExternalODSData()

  const {
    instanceOdsMetadata
  } = useOdsInstanceDescription({ instance })

  const { getOdsInstanceEdFiStatus } = useOdsInstanceEdFiStatus({
    instance,
    edFiMetadata: instanceOdsMetadata
  })

  const selectTabs = (tabName: string) => {
    if (tabName === 'Data Management (Advanced)') {
      if (adminConfig && adminConfig.showAdvancedTabs) {
        return true
      }

      return false
    }

    if (tabName == 'Vendors & Applications') {
      return showPartnersTab()
    }

    return true
  }

  const updateTabs = (tabName: string, index: number) => {
    if (externalODS.isExternalODS && index === 1) {
      return 'Applications'
    }

    return tabName
  }

  const showPartnersTab = (): boolean => {
    const odsInstanceEdFiStatus = getOdsInstanceEdFiStatus()

    if (odsInstanceEdFiStatus.operationStatus == 'Offline') {
      return false
    }

    return true
  }

  const getSchoolYear = () => {
    if (!instance) {
      return 0
    }

    const year = 0//getInstanceYear(instance)

    if (!year) {
      return 0
    }

    return year
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      {instance && <ConfirmSetDefaultInstanceModal
        instance={instance}
        show={showConfirmSetDefaultModal}
        updatingInstance={updatingInstance}
        onClose={onCloseConfirmSetDefaultModal}
        onSetIsDefault={onSetIsDefault}
      />}

      {instance && <SetUpInstanceModal
        instance={instance}
        show={showSetUpWizardModal}
        onClose={onCloseSetUpWizardModal}
      />}

      <Heading
        mt='5px'
        size='lg'
      >
        {instance ? getDisplayYear(instance) : 'Loading...'}
      </Heading>

      <Flex
        mt='24px'
        w='full'
      >
        <Flex
          alignItems='flex-start'
          className="spaec"
          justifyContent='space-between'
          position='relative'
          w='full'
        >
          <AdminConsoleTabsMenu
            includeWrapper={false}
            initialIndex={0}
            tabsList={tabsList.filter(tab => selectTabs(tab)).map((tab, index) => updateTabs(tab, index))}
          >
            <TabContentWrapper>
              {instance 
                ? <InstanceSummaryTabContent instance={instance} />
                :
                <InstanceLoadingContent />}
            </TabContentWrapper>

            <TabContentWrapper>
              {externalODS.isExternalODS ?
                <EdFiSettingsTabContent /> :
                <PartnersAndApplicationTabContent
                  instance={instance}
                  schoolYear={getSchoolYear()}
                />}
            </TabContentWrapper>

            <TabContentWrapper>
              <DataManagementTabContent />
            </TabContentWrapper>
          </AdminConsoleTabsMenu>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InstanceTabsMenu