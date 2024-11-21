import { useState } from 'react'

const useConfirmSetDefaultModal = () => {
  const [showConfirmSetDefaultModal, setShowConfirmSetDefaultModal] = useState(false)
  const onShowConfirmSetDefaultModal = () => setShowConfirmSetDefaultModal(true)
  const onCloseConfirmSetDefaultModal = () => setShowConfirmSetDefaultModal(false)

  return {
    showConfirmSetDefaultModal,
    onShowConfirmSetDefaultModal,
    onCloseConfirmSetDefaultModal
  }
}

export default useConfirmSetDefaultModal