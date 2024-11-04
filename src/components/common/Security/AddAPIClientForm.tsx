import ModalForm from '../ModalForm'

interface AddAPIClientFormProps {
    header: JSX.Element
    content: JSX.Element
}

const AddAPIClientForm = ({ header, content }: AddAPIClientFormProps) => {
  return (
    <ModalForm
      header={header}
      content={content}
      height='auto'
      width="512px" />
  )
}

export default AddAPIClientForm