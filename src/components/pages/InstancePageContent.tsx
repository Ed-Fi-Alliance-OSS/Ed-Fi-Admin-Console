import { Flex } from "@chakra-ui/react"
import useOdsInstanceData from "../../hooks/odsInstances/useOdsInstanceData"
import InstancePageHeader from "../common/Instance/InstancePageHeader"
import InstanceTabsMenu from "../common/Instance/InstanceTabsMenu"
import useOdsInstancePageContent from "../../hooks/odsInstances/useOdsInstancePageContent"
import useSetUpWizardModal from "../../hooks/odsInstances/useSetUpWizardModal"

interface InstancePageContentProps {
    instanceYear: string  
}

const InstancePageContent = ({ instanceYear }: InstancePageContentProps) => {
    const { 
        instance, 
        updatingInstance,
        onSetIsDefault,
        showConfirmSetDefaultModal,
        onShowConfirmSetDefaultModal,
        onCloseConfirmSetDefaultModal } = useOdsInstanceData({ 
            instanceYear: instanceYear
        })

    const {
        showSetUpWizardModal,
        onCloseSetUpWizardModal,
        onShowSetUpWizardModal
    } = useSetUpWizardModal()

    const {
        availableSetDefault
    } = useOdsInstancePageContent({
        instance
    })
    
    return (
        <Flex flexDir='column' w='full'>
            <InstancePageHeader />
            <InstanceTabsMenu 
                instance={instance}
                canSetAsDefault={availableSetDefault}
                updatingInstance={updatingInstance}
                onSetIsDefault={onSetIsDefault}
                showConfirmSetDefaultModal={showConfirmSetDefaultModal}
                onShowConfirmSetDefaultModal={onShowConfirmSetDefaultModal}
                onCloseConfirmSetDefaultModal={onCloseConfirmSetDefaultModal} 
                showSetUpWizardModal={showSetUpWizardModal} 
                onCloseSetUpWizardModal={onCloseSetUpWizardModal} 
                onShowSetUpWizardModal={onShowSetUpWizardModal} />
        </Flex>
    )
}

export default InstancePageContent