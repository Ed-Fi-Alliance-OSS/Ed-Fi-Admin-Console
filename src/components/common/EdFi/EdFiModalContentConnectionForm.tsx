import useEdFiConnectionForm from "../../../hooks/edfi/useEdFiConnectionForm"
import { EdFiConnectionFormData, EdFiConnectionFormMode } from "../../../hooks/edfi/useEdFiConnectionForm.types"
import ModalForm from "../ModalForm"
import EdFiConnectionForm from "./EdFiConnectionForm"
import EdFiEditConnectionFormHeader from "./EdFiConnectionFormHeader"

interface EdFiEditConnectionFormProps {
    mode: EdFiConnectionFormMode
    initialData?: EdFiConnectionFormData
    onAfterEdit: () => void
    onConfirmClose: () => void
    onClose: () => void
}

const EdFiModalContentConnectionForm  = ({ mode, initialData, onClose, onConfirmClose }: EdFiEditConnectionFormProps) => {
    const { 
        formData, 
        isSaving,
        verificationStatus,
        isVerifying,
        errors,
        onInputChange,
        isDisabledSave,
        isDisabledVerification,
        onVerifyConnection,
        onSave } = useEdFiConnectionForm({ initialData, mode, inOnboarding: false })

    const onSaveChanges = async () => {
        await onSave()

        if (verificationStatus === 'Connected')
            onClose()
    }

    return (
        <ModalForm
            header={<EdFiEditConnectionFormHeader
                isSaving={false}
                onAction={onSaveChanges}
                isDisabled={isDisabledSave()}
                onClose={onConfirmClose} />}
            content={<EdFiConnectionForm
                formData={formData}
                isSaving={isSaving}
                isverifying={isVerifying}
                inOnboarding={false}
                disabledVerification={!isDisabledVerification()}
                mode={mode}
                verificationStatus={verificationStatus}
                errors={errors}
                onInputChange={onInputChange}
                onVerifyConnection={onVerifyConnection} />}
            height='auto'
            width="512px" />
    )
}

export default EdFiModalContentConnectionForm