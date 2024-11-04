import { Flex, Heading } from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'
import useExternalODSData from '../../../hooks/useExternalODSData'
import AdminConsoleTabsMenu from '../AdminConsoleTabsMenu'
import EdFiSettingsTabContent from '../EdFi/EdFiSettingsTabContent'
import ConfirmSetDefaultInstanceModal from '../ODS/ConfirmSetDefaultInstanceModal'
import ODSInstanceDynamicIsDefaultBtn from '../ODS/ODSInstanceDynamicIsDefaultBtn'
import TabContentWrapper from '../TabContentWrapper'
import DataManagementTabContent from './DataManagementTabContent'
import InstanceLoadingContent from './InstanceLoadingContent'
import InstanceSummaryTabContent from './InstanceSummaryTabContent'
import PartnersAndApplicationTabContent from './PartnersAndApplicationTabContent'
import SetUpInstanceModal from '../ODS/SetUpInstanceModal'
import useOdsInstanceDescription from '../../../hooks/odsInstances/useOdsInstanceDescription'
import useOdsInstanceEdFiStatus from '../../../hooks/odsInstances/useOdsInstanceEdFiStatus'
import useOdsInstanceYear from '../../../hooks/odsInstances/useOdsInstanceYear'

const tabsList = [
  'Summary',
  'Partners & Applications',
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
  const { getInstanceYear } = useOdsInstanceYear()
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
      if (adminConfig && adminConfig.showAdvancedTabs)
        return true

      return false
    }

    if (tabName == 'Partners & Applications')
      return showPartnersTab()

    return true
  }

  const updateTabs = (tabName: string, index: number) => {
    if (externalODS.isExternalODS && index === 1)
      return 'Applications'

    return tabName
  }

  const showPartnersTab = (): boolean => {
    const odsInstanceEdFiStatus = getOdsInstanceEdFiStatus()

    console.log('show partners tab', odsInstanceEdFiStatus)

    if (odsInstanceEdFiStatus.onboardingStatus == 'Empty')
      return false

    if (odsInstanceEdFiStatus.operationStatus == 'Outage')
      return false

    return true
  }

  const getSchoolYear = () => {
    if (!instance)
      return 0 

    const year = getInstanceYear(instance)

    if (!year)
      return 0

    return year
  }

  return (
    <Flex flexDir='column' w='full'>
      { instance && <ConfirmSetDefaultInstanceModal
        show={showConfirmSetDefaultModal}
        instance={instance}
        updatingInstance={updatingInstance}
        onSetIsDefault={onSetIsDefault}
        onClose={onCloseConfirmSetDefaultModal} />}

      { instance && <SetUpInstanceModal 
        instance={instance} 
        show={showSetUpWizardModal} 
        onClose={onCloseSetUpWizardModal} /> }
                
      <Heading
        size='lg'
        mt='5px'>
        { instance? getDisplayYear(instance) : 'Loading...'}
      </Heading>
      <Flex mt='24px' w='full'>
        <Flex className="spaec" position='relative' alignItems='flex-start' justifyContent='space-between' w='full'>
          <AdminConsoleTabsMenu 
            includeWrapper={false}
            tabsList={tabsList.filter(tab => selectTabs(tab)).map((tab, index) => updateTabs(tab, index))}
            initialIndex={0}
            actionControl={<>
              { instance && <ODSInstanceDynamicIsDefaultBtn
                instance={instance}
                canSetDefault={canSetAsDefault}
                onOpenIsDefaultModal={onShowConfirmSetDefaultModal} 
                onShowSetUpWizardModal={onShowSetUpWizardModal} /> }
            </>}>
            <TabContentWrapper>
              { instance? <InstanceSummaryTabContent 
                instance={instance} /> 
                : 
                <InstanceLoadingContent /> }
            </TabContentWrapper>
            <TabContentWrapper>
              { externalODS.isExternalODS? 
                <EdFiSettingsTabContent /> : 
                <PartnersAndApplicationTabContent
                  instance={instance}
                  schoolYear={getSchoolYear()} /> }
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