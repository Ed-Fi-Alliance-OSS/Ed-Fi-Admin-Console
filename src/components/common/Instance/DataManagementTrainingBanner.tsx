import { Button, Flex, Text } from "@chakra-ui/react"

interface DataManagementTrainingBannerProps {
    text: string 
    onSkipTraining: () => void
    onLearnMode: () => void
}

const DataManagementTrainingBanner = ({ text, onSkipTraining, onLearnMode }: DataManagementTrainingBannerProps) => {
    return (
        <Flex
            bg='blue.500'
            borderRadius='4px'
            padding='49px 36px'
            h='136px'
            w='full'>
                <Text
                    color='white'
                    fontFamily='Poppins'
                    fontWeight='700'
                    fontSize='24px'>
                        {text}
                </Text>
                <Flex ml='auto'>
                    <Button
                        color='white'
                        onClick={onSkipTraining}
                        border='1px'
                        borderColor='white'
                        borderRadius='4px'
                        size='md'
                        w='186px'>
                            Skip Training
                    </Button>
                    <Button
                        color='blue.900'
                        bg='white'
                        onClick={onLearnMode}
                        variant='secondaryWhite'
                        border='1px'
                        borderColor='white'
                        size='md'
                        ml='10px'
                        w='170px'
                        _hover={{ color: 'white', bg: 'transparent' }}>
                            Learn More
                    </Button>
                </Flex>
        </Flex>
    )
}

export default DataManagementTrainingBanner