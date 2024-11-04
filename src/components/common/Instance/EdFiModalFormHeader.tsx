import ModalFormHeader from '../ModalFormHeader'

interface EdFiModalFormHeaderProps {
    actionText: string 
    headerText: string 
    isSaving: boolean 
    isDisabled: boolean 
    onAction: () => void
    onClose: () => void
}

const EdFiModalFormHeader = ({ actionText, headerText, isSaving, isDisabled, onAction, onClose }: EdFiModalFormHeaderProps) => {
  return (
    <ModalFormHeader
      actionText={actionText}
      headerText={headerText}
      headerWidth="200px"
      isDisabled={isDisabled}
      isSaving={isSaving}
      onAction={onAction}
      onClose={onClose} />
  )
}

export default EdFiModalFormHeader