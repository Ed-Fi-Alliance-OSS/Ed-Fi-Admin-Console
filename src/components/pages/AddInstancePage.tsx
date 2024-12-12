import { Flex } from '@chakra-ui/react'
import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  ChangeEvent, useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useMockData } from '../../context/mockDataContext'
import routes from '../../core/routes'
import useEDXToast from '../../hooks/common/useEDXToast'
import { usePluginContext } from '../../plugins/BasePlugin'
import BackToLink from '../common/BackToLink'
import AddInstanceForm from '../common/Instance/AddInstanceForm'
import TabContentWrapper from '../common/TabContentWrapper'
import TabHeading from '../common/TabHeading'

const AddInstancePage = () => {
  const mock = useMockData()
  const [ instanceName, setInstanceName ] = useState('')
  const [ instanceType, setInstanceType ] = useState('')
  const [ connectionString, setConnectionString ] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {    
    if(e.target.id === 'name') {
      setInstanceName(e.target.value)
    }
  
    if (e.target.id === 'type') {
      setInstanceType(e.target.value)
    }

    if (e.target.id === 'connectionString') {
      setConnectionString(e.target.value)
    }
  }

  const { successToast } = useEDXToast()
  const nav = useNavigate()
  const { functionalities } = usePluginContext()
  const { config } = useConfig()
  const apiService = functionalities.ApiService?.(config, useApiService)

  const handleSaveChanges = async () => {
    await apiService?.instances.create({
      name: instanceName,
      instanceType: instanceType,
      connectionString: connectionString
    })

    successToast(`Instance created successfully, Instance: ${instanceName}, Type: ${instanceType}, Connection String: ${connectionString}`)

    nav(-1)
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <BackToLink 
        text='Back to Tech Console Home' 
        url={routes.home.url}
      />

      <Flex
        mt='16px'
        w='full'
      >
        <TabContentWrapper>
          <Flex w='200px'>
            <TabHeading text="Create Instance" />
          </Flex>

          <Flex
            maxW='800px'
            mt='16px'
            mx='auto'
            w='full'
          >
            <AddInstanceForm
              connectionString={connectionString}
              name={instanceName}
              type={instanceType}
              onInputChange={handleInputChange}
              onSaveChanges={handleSaveChanges} 
            />
          </Flex>
        </TabContentWrapper>
      </Flex>
    </Flex>
  )
}

export default AddInstancePage