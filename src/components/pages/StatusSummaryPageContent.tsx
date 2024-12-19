import { Flex } from '@chakra-ui/react'
import { InstanceEdfiStatus } from '../../core/ODSInstance.types'
import StatusSummaryAccordion from '../common/Instance/StatusSummaryAccordion'
import StatusSummaryPageHeader from '../common/Instance/StatusSummaryPageHeader'

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

const instanceList: InstanceHealth[] = [
  { 
    name: 'Grand Bend 2023-24',
    status: { operationStatus: 'Offline' },
    healthList: [
      {
        name: 'Administration',
        uptimeDescription: '100% in the last 90 days',
        uptimePercentage: 100,
        updatedDate: 'Updated 5 hours ago' 
      },
      {
        name: 'Web Application',
        uptimeDescription: '100% in the last 90 days',
        uptimePercentage: 100,
        updatedDate: 'Updated 5 hours ago' 
      },
      {
        name: 'Analytics',
        uptimeDescription: '100% in the last 90 days',
        uptimePercentage: 100,
        updatedDate: 'Updated 5 hours ago' 
      },
      {
        name: 'Automation Service',
        uptimeDescription: '100% in the last 90 days',
        uptimePercentage: 100,
        updatedDate: 'Updated 5 hours ago' 
      }
    ]
  },
  { 
    name: 'Grand Bend 2023-24',
    status: { operationStatus: 'Offline' },
    healthList: [
      {
        name: 'Administration',
        uptimeDescription: '100% in the last 90 days',
        uptimePercentage: 100,
        updatedDate: 'Updated 5 hours ago' 
      }
    ]
  },
  { 
    name: 'Grand Bend 2023-24',
    status: { operationStatus: 'Offline' },
    healthList: [
      {
        name: 'Administration',
        uptimeDescription: '100% in the last 90 days',
        uptimePercentage: 100,
        updatedDate: 'Updated 5 hours ago' 
      }
    ]
  },
  { 
    name: 'Grand Bend 2023-24',
    status: { operationStatus: 'Offline' },
    healthList: [
      {
        name: 'Administration',
        uptimeDescription: '100% in the last 90 days',
        uptimePercentage: 100,
        updatedDate: 'Updated 5 hours ago' 
      }
    ]
  },
]

const StatusSummaryPageContent = () => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <StatusSummaryPageHeader />

      <Flex
        mt='24px'
        w='full'
      >
        <StatusSummaryAccordion instanceList={instanceList} />
      </Flex>
    </Flex>
  )
}

export default StatusSummaryPageContent