import ModalFormHeader from "../ModalFormHeader"

interface EdFiEditConnectionFormHeaderProps {
    isSaving: boolean 
    isDisabled: boolean 
    onAction: () => void
    onClose: () => void
}

const EdFiEditConnectionFormHeader = ({ isSaving, isDisabled, onAction, onClose }: EdFiEditConnectionFormHeaderProps) => {
    return (
        <ModalFormHeader
            actionText="Save"
            headerText="Edit Application"
            headerWidth="200px"
            isDisabled={isDisabled}
            isSaving={isSaving}
            onAction={onAction}
            onClose={onClose} />
    )
}

export default EdFiEditConnectionFormHeader