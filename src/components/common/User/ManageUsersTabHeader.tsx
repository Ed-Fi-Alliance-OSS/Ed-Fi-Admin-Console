import { Button, Flex, FormControl, Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { UsersTableMode } from '../../../hooks/adminActions/users/useManageUsersTable'
import ControlTableFilterPopover from '../ControlTableFilterPopover'

interface ManageUsersTabHeaderProps {
    filterValue: string
    filterOptionsList: string[]
    mode: UsersTableMode
    selectedFilter?: string 
    onChangeFilter: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
    onFilter: () => void
    onChangeMode: (e: ChangeEvent<HTMLSelectElement>) => void
    onResetFilter: () => void
    onAddUser: () => void
    onRefreshData: () => void
}

const ManageUsersTabHeader = ({ mode, filterValue, selectedFilter, filterOptionsList, onAddUser, onRefreshData, onChangeMode, onChangeFilter, onChangeValue, onFilter, onResetFilter }: ManageUsersTabHeaderProps) => {
  const optionTextList = [
    'First Name',
    'Last Name',
    'Email',
    'Status'
  ]

  const selectUITextOption = (option: string) => {
    if (option === 'firstName')
      return optionTextList[0]

    if (option === 'lastName')
      return optionTextList[1]

    if (option === 'email')
      return optionTextList[2]

    if (option === 'status')
      return optionTextList[3]

    return 'Select Filter'
  }

  return (
    <Flex justifyContent='space-between' w='full'>
      <Flex alignItems='flex-end'>
        <Flex flexDir='column' aria-label="Select Mode" id="selectMode">
          <FormControl>
            <Select
              aria-labelledby="selectMode"
              fontFamily='Poppins'
              fontWeight='700'
              fontSize='32px'
              lineHeight='42px' 
              value={mode} 
              onChange={onChangeMode}
              border='none'
              w='230px'>
              <option key="users" value="users" style={{ fontFamily: 'sans-serif' }}>Users</option>
              <option key="invitations" value='invitations' style={{ fontFamily: 'sans-serif' }}>Invitations</option>
            </Select>
          </FormControl>
        </Flex>
        <Flex justifyContent='center' ml='5px' mb='6px'>
          <ControlTableFilterPopover
            textFilter={filterValue}
            options={filterOptionsList}
            selectedOption={selectedFilter}
            selectUITextOption={selectUITextOption}
            isUserControl={true}
            onChangeFilterOption={onChangeFilter}
            onChangeText={onChangeValue}
            onFilter={onFilter}
            onResetFilter={onResetFilter} />
        </Flex>
      </Flex>
      <Flex alignItems='center' mt='5px'>
        <Button
          onClick={onRefreshData}
          variant='secondaryBlue600'
          size='xs'
          p='0 25px'
          minW='5px'>
                        Refresh List
        </Button>
        <Button
          onClick={onAddUser}
          variant='primaryBlue600'
          size='xs'
          p='0 25px'
          minW='5px'
          ml='8px'>
                        Add User
        </Button>
      </Flex>
    </Flex>
  )
}

export default ManageUsersTabHeader