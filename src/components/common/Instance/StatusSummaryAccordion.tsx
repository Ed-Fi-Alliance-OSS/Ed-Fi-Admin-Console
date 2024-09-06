import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Flex,
} from '@chakra-ui/react'
import { InstanceEdfiStatus } from '../../../core/ODSInstance.types'
import ODSInstanceEdFiStatus from '../ODS/ODSInstanceEdFiStatus'
import InstanceServiceHealthBar from './InstanceServiceHealthBar'

interface ServiceHealth {
    name: string 
    uptimeDescription: string 
    uptimePercentage: number 
    updatedDate: string 
}

interface InstanceHealth {
    name: string 
    status: InstanceEdfiStatus
    healthList: Array<ServiceHealth>
}

interface StatusSummaryAccordionProps {
    instanceList: InstanceHealth[]
}

const StatusSummaryAccordion = ({ instanceList }: StatusSummaryAccordionProps) => {
    return (
        <Accordion w='full'>
            {instanceList.map((instance, index) => 
                <AccordionItem 
                    key={index} 
                    bg='white' 
                    borderRadius='4px'
                    border='1px'
                    borderColor='gray.300'
                    _notFirst={{ mt: '24px' }}>
                        <AccordionButton
                            display='flex'
                            alignItems='center'
                            h='64px'>
                                <AccordionIcon ml='30px' aria-hidden="true" focusable="false" />
                                <Text 
                                    color='blue.600'
                                    fontFamily='Open sans'
                                    fontWeight='700'
                                    size='16px'
                                    ml='10px'>
                                        {instance.name}
                                </Text>
                                <Flex ml='50px'>
                                    <ODSInstanceEdFiStatus status={instance.status} />
                                </Flex>
                        </AccordionButton>
                    <AccordionPanel padding='45px 30px'>
                        {instance.healthList.map((service, sindex) => 
                            <InstanceServiceHealthBar
                                key={sindex}
                                serviceHealth={service} />
                        )}
                    </AccordionPanel>
                </AccordionItem>
            )}
        </Accordion>
    )
}

export default StatusSummaryAccordion