import ConsoleModal from '../ConsoleModal'
import AddAPIClientForm from './AddAPIClientForm'
import AddAPIClientFormContent from './AddAPIClientFormContent'
import AddAPIClientFormHeader from './AddAPIClientFormHeader'

interface AddAPIClientModalProps {
    show: boolean
    onClose: () => void
}

const AddAPIClientModal = ({ show, onClose }: AddAPIClientModalProps) => {
  return (
    <ConsoleModal
      content={<AddAPIClientForm
        content={<AddAPIClientFormContent />} 
        header={<AddAPIClientFormHeader onClose={onClose} />}
      />}
      show={show}
      onClose={onClose}
    />
  )
}

export default AddAPIClientModal