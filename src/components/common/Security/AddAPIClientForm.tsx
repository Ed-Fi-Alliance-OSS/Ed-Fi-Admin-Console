import ModalForm from '../ModalForm'

interface AddAPIClientFormProps {
    header: JSX.Element
    content: JSX.Element
}

const AddAPIClientForm = ({ header, content }: AddAPIClientFormProps) => {
  return (
    <ModalForm
      content={content}
      header={header}
      height='auto'
      width="512px"
    />
  )
}

export default AddAPIClientForm