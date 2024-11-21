import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

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
    <Flex
      alignItems={alignCenter? 'center' : 'start'}
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
        w={headerWidth ?? 'auto'}
      >{headerText}
      </Heading>

      <Flex alignItems='flex-end'>
        <Button
          padding='0 25px'
          size='xs'
          variant='secondaryBlue600'
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          data-testid="add-user-btn"
          isDisabled={isSaving || isDisabled}
          isLoading={isSaving}
          ml='10px'
          padding='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onAction}
        >{actionText}
        </Button>
      </Flex>
    </Flex>
  )
}

export default ModalFormHeader