import {
  Button, Flex 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import ControlTableFilterPopover from '../ControlTableFilterPopover'
import TabHeading from '../TabHeading'

interface ManageSubscriptionsTabHeaderProps {
    filterValue: string
    filterOptionsList: string[]
    selectedFilter?: string 
    onChangeFilter: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
    onFilter: () => void
    onResetFilter: () => void
    onRefreshData: () => void
    onAddSubscription: () => void
}

const ManageSubscriptionsTabHeader = ({ filterOptionsList, filterValue, selectedFilter, onChangeFilter, onChangeValue, onFilter, onResetFilter, onRefreshData, onAddSubscription }: ManageSubscriptionsTabHeaderProps) => {
  const optionTextList = [
    'Application',
    'Licenses',
    'Starts',
    'Ends',
    'License Type',
    'Status'
  ]

  const selectUITextOption = (option: string) => {
    console.log(option)

    if (option === 'applicationName') {
      return optionTextList[0]
    }

    if (option === 'licensesAmount') {
      return optionTextList[1]
    }

    if (option === 'startDateTime') {
      return optionTextList[2]
    }

    if (option === 'endDateTime') {
      return optionTextList[3]
    }

    if (option === 'licenseType') {
      return optionTextList[4]
    }

    if (option === 'subscriptionStatus') {
      return optionTextList[5]
    }

    return 'select filter'
  }

  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Flex alignItems='flex-end'>
        <TabHeading text="Licenses" />

        <Flex
          alignItems='center'
          justifyContent='flex-end'
          mb='6px'
          ml='5px'
        >
          <ControlTableFilterPopover
            options={filterOptionsList}
            selectedOption={selectedFilter}
            selectUITextOption={selectUITextOption}
            textFilter={filterValue}
            onChangeFilterOption={onChangeFilter}
            onChangeText={onChangeValue}
            onFilter={onFilter}
            onResetFilter={onResetFilter}
          />
        </Flex>
      </Flex>

      <Flex
        alignItems='center'
        mt='5px'
      >
        <Button
          minW='5px'
          p='0 25px'
          size='xs'
          variant='secondaryBlue600'
          onClick={onRefreshData}
        >
          Refresh List
        </Button>

        <Button
          minW='5px'
          ml='8px'
          p='0 25px'
          size='xs'
          variant='primaryBlue600'
          onClick={onAddSubscription}
        >
          Add License
        </Button>
      </Flex>
    </Flex>
  )
}

export default ManageSubscriptionsTabHeader