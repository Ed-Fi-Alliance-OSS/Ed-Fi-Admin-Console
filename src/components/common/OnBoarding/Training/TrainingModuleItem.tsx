import {
  Button, Flex, Text 
} from '@chakra-ui/react'
import {
  TrainingModule, TrainingModuleStatus 
} from '../../../../core/TrainingModule.types'

interface TrainingModuleItemProps {
    data: TrainingModule
    status: TrainingModuleStatus
    onAction: () => void
}

const TrainingModuleItem = ({ data, status, onAction }: TrainingModuleItemProps) => {
  return (
    <Flex 
      _last={{
        borderBottom: '1px',
        borderBottomColor: 'gray.300' 
      }}
      borderColor='gray.300'
      borderTop='1px'
      borderX='1px' 
      justifyContent='space-between'
      padding='16px 22px 16px 16px'
      w='full'
    >
      <Text 
        color='blue.600'
        fontFamily='Open sans'
        fontWeight='700'
        size='md'
      >
        { data.name }
      </Text>

      <Text
        color='gray.700'
        fontFamily='Open sans'
        fontWeight='400'
        size='md'
        w='271px'
      >
        { data.description }
      </Text>

      <Button
        isDisabled={status === 'Complete'}
        size='xs'
        variant='secondaryBlue500'
        w='108px'
        onClick={onAction}
      >
        { status }
      </Button>
    </Flex>
  )
}

export default TrainingModuleItem