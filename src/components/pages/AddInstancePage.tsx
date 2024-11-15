import { Flex } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMockData } from '../../context/mockDataContext'
import { ODSInstance } from '../../core/ODSInstance.types'
import routes from '../../core/routes'
import useEDXToast from '../../hooks/common/useEDXToast'
import BackToLink from '../common/BackToLink'
import AddInstanceForm from '../common/Instance/AddInstanceForm'
import TabContentWrapper from '../common/TabContentWrapper'
import TabHeading from '../common/TabHeading'

const AddInstancePage = () => {
  const mock = useMockData()
  const [instanceName, setInstanceName] = useState('')
  const [instanceDescription, setInstanceDescription] = useState('')
  const [schoolYear, setSchoolYear] = useState('2023')
  const [schoolYearOptions, setSchoolYearOptions] = useState([
    '2023',
    '2024',
    '2025'
  ])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {    
    setInstanceDescription(e.target.value)
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if(e.target.id === 'instanceName') {
      setInstanceName(e.target.value)
    }
    if (e.target.id === 'schoolYear') {
      setSchoolYear(e.target.value)
    }
  }
  const {successToast} = useEDXToast()
  const nav = useNavigate()
  const handleSaveChanges = () => {
    // TODO: Add Real Instance API Call
    mock.addElement('Instances', {
      instanceId: instanceName,
      instanceName: instanceName,
      schoolYears: [
        Number.parseInt(schoolYear)
      ],
      baseUrl: 'https://999999.preprod-2024-2.edfi.pre.txedexchange.net'
    } as ODSInstance)
    successToast(`Instance created successfully, Instance: ${instanceName}, Description: ${instanceDescription}, School Year: ${schoolYear}`)
    nav(-1)
  }

  return (
    <Flex flexDir='column' w='full'>
      <BackToLink 
        url={routes.home.url} 
        text='Back to Tech Console Home' />
      <Flex mt='16px' w='full'>
        <TabContentWrapper>
          <Flex w='200px'>
            <TabHeading text="Create Instance" />
          </Flex>
          <Flex w='full' mx='auto' mt='16px' maxW='800px'>
            <AddInstanceForm
              instanceName={instanceName}
              instanceDescription={instanceDescription}
              schoolYearOptions={schoolYearOptions}
              schoolYear={schoolYear}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange} 
              onSaveChanges={handleSaveChanges} />
          </Flex>
        </TabContentWrapper>
      </Flex>
    </Flex>
  )
}

export default AddInstancePage