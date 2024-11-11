import { EdFiConnectionFormData } from '../../../hooks/edfi/useEdFiConnectionForm.types'
import ModalForm from '../ModalForm'
import EdFiModalFormHeader from './EdFiModalFormHeader'

interface EdFiModalFormProps {
    actionText: string 
    headerText: string 
    initialData?: EdFiConnectionFormData
    content: JSX.Element
    isSaving: boolean 
    onSave: () => void
    onClose: () => void
}

const EdFiModalForm  = ({ actionText, headerText, content, isSaving, onSave, onClose }: EdFiModalFormProps) => {
  return (
    <ModalForm
      header={<EdFiModalFormHeader
        actionText={actionText}
        headerText={headerText}
        isSaving={isSaving}
        onAction={onSave}
        isDisabled={false}
        onClose={onClose} />}
      content={content}
      height='auto'
      width="512px" />
  )
}

export default EdFiModalForm