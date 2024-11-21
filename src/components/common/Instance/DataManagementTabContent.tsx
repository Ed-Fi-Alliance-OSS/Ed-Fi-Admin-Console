import {
  ChangeEvent, useState 
} from 'react'
import {
  Button, Flex, FormControl, Text 
} from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import DescriptorsTable from './DescriptorsTable'
import EducationOrganizationsTable from './EducationOrganizationsTable'
import PermissionsAccordion from './PermissionsAccordion'
import {
  CustomFormLabel, CustomSelect 
} from '@edfi/admin-console-shared-sdk'

const dataSourceOptions = [
  'Select',
  'Education Organizations',
  'Descriptors',
  'Permissions'
]

const DataManagementTabContent = () => {
  const [showLoadedData, setShowLoadedData] = useState(false)
  const [selectedDataSource, setSelectedDataSource] = useState(dataSourceOptions[0])

  const handleDataSourceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== dataSourceOptions[0]) {
      setSelectedDataSource(e.target.value)
    }
  }

  return (
    <Flex 
      flexDir='column'
      w='full'
    >
      <Flex w='full'>
        <Flex w='250px'>
          <TabHeading text="Data Management (Advanced)" />
        </Flex>

        <Flex
          flexDir='column'
          ml='50px'
          w='700px'
        >
          <FormControl mt='16px'>
            <CustomFormLabel
              htmlFor='selectDataSource'
              text='Select Data to Load'
            />

            <CustomSelect 
              options={dataSourceOptions.map(option => ({
                value: option,
                text: option 
              }) )}
              id="selectDataSource"
              value={selectedDataSource}
              onChange={handleDataSourceChange}
            />
          </FormControl>

          {false && <Button
            maxW='200px'
            minW='200px'
            mt='32px'
            size='lg'
            variant='primaryBlue600'
            onClick={() => setShowLoadedData(true)}
          >
            Load Data
          </Button>}
        </Flex>
      </Flex>

      {selectedDataSource !== dataSourceOptions[0] &&  <>
        <Flex
          alignItems='flex-end'
          mt='120px'
        >
          <TabHeading text={selectedDataSource} />

          <Text
            color='gray.500'
            fontFamily='Open sans'
            fontSize='18px'
            fontWeight='400'
            mb='5px'
            ml='15px'
          >
            (Read-Only)
          </Text>
        </Flex>

        <Flex
          bg='white'
          mt='32px'
          w='full'
        >
          {selectedDataSource === dataSourceOptions[1] && <EducationOrganizationsTable />}

          {selectedDataSource === dataSourceOptions[2] && <DescriptorsTable />}

          {selectedDataSource === dataSourceOptions[3] && <PermissionsAccordion />}
        </Flex>
      </>}
    </Flex>
  )
}

export default DataManagementTabContent