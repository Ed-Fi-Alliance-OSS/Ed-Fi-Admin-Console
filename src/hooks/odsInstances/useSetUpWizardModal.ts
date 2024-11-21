import { useState } from 'react'

const useSetUpWizardModal = () => {
  const [showSetUpWizardModal, setShowSetUpWizardModal] = useState(false)
  const onShowSetUpWizardModal = () => setShowSetUpWizardModal(true)
  const onCloseSetUpWizardModal = () => setShowSetUpWizardModal(false)

  return {
    showSetUpWizardModal,
    onShowSetUpWizardModal,
    onCloseSetUpWizardModal
  }
}

export default useSetUpWizardModal