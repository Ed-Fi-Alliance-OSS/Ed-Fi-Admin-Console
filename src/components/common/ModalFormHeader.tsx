import { Button, Flex, Heading } from '@chakra-ui/react'

interface ModalFormHeaderProps {
    headerText: string 
    actionText: string
    isSaving: boolean 
    alignCenter?: boolean 
    isDisabled?: boolean
    headerWidth?: string
    onAction: () => void
    onClose: () => void
}

const ModalFormHeader = ({ actionText, headerText, headerWidth, alignCenter, isDisabled, isSaving, onAction, onClose }: ModalFormHeaderProps) => {
  return (
    <Flex justifyContent='space-between' alignItems={alignCenter? 'center' : 'start'} w='full'>
      <Heading
        fontFamily='Poppins'
        fontWeight='700'
        fontSize='32px'
        w={headerWidth ?? 'auto'}>{headerText}</Heading>
      <Flex alignItems='flex-end'>
        <Button
          onClick={onClose}
          variant='secondaryBlue600'
          size='xs'
          padding='0 25px'>Cancel</Button>
        <Button
          onClick={onAction}
          variant='primaryBlue600'
          data-testid="add-user-btn"
          isLoading={isSaving}
          isDisabled={isSaving || isDisabled}
          size='xs'
          padding='0 25px'
          ml='10px'>{actionText}</Button>
      </Flex>
    </Flex>
  )
}

export default ModalFormHeader