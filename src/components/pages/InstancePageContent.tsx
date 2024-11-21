import { Flex } from '@chakra-ui/react'
import useOdsInstanceData from '../../hooks/odsInstances/useOdsInstanceData'
import InstancePageHeader from '../common/Instance/InstancePageHeader'
import InstanceTabsMenu from '../common/Instance/InstanceTabsMenu'
import useOdsInstancePageContent from '../../hooks/odsInstances/useOdsInstancePageContent'
import useSetUpWizardModal from '../../hooks/odsInstances/useSetUpWizardModal'

interface InstancePageContentProps {
    instanceYear: string  
}

const InstancePageContent = ({ instanceYear }: InstancePageContentProps) => {
  const { instance, 
    updatingInstance,
    onSetIsDefault,
    showConfirmSetDefaultModal,
    onShowConfirmSetDefaultModal,
    onCloseConfirmSetDefaultModal } = useOdsInstanceData({ instanceYear: instanceYear })

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