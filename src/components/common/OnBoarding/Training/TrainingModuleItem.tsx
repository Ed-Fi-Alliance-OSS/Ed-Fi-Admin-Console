import { Button, Flex, Text } from "@chakra-ui/react"
import { TrainingModule, TrainingModuleStatus } from "../../../../core/TrainingModule.types"

interface TrainingModuleItemProps {
    data: TrainingModule
    status: TrainingModuleStatus
    onAction: () => void
}

const TrainingModuleItem = ({ data, status, onAction }: TrainingModuleItemProps) => {
    return (
        <Flex 
            borderTop='1px'
            borderX='1px'
            borderColor='gray.300'
            justifyContent='space-between' 
            padding='16px 22px 16px 16px'
            _last={{ borderBottom: '1px', borderBottomColor: 'gray.300' }}
            w='full'>
                <Text 
                    color='blue.600'
                    fontFamily='Open sans'
                    fontWeight='700'
                    size='md'>
                        { data.name }
                </Text>
                <Text
                    color='gray.700'
                    fontFamily='Open sans'
                    fontWeight='400'
                    size='md'
                    w='271px'>
                        { data.description }
                </Text>
                <Button
                    onClick={onAction}
                    isDisabled={status === 'Complete'}
                    variant='secondaryBlue500'
                    size='xs'
                    w='108px'>
                        { status }
                </Button>
        </Flex>
    )
}

export default TrainingModuleItem