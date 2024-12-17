import {
  Flex, Text
} from '@chakra-ui/react'
import { useState } from 'react'
import AddAPIClientModal from './AddAPIClientModal'
import APIClientsTabHeader from './APIClientsTabHeader'
import APIClientsTable from './APIClientsTable'

const apiClientList = []

const APIClientsTab = () => {
  const [ showAddAPIClientModal, setShowAddAPIClientModal ] = useState(false)
  const handleShowAddAPIClientModal = () => setShowAddAPIClientModal(true)
  const handleHideAddAPIClientModal = () => setShowAddAPIClientModal(false)

  return (
    <Flex
      flexDir='column'
      mt='30px'
      w='917px'
    >
      <AddAPIClientModal
        show={showAddAPIClientModal}
        onClose={handleHideAddAPIClientModal}
      />

      <APIClientsTabHeader onAddAPIClient={handleShowAddAPIClientModal} />

      <Flex mt='18px'>
        {apiClientList.length > 0? 
          <APIClientsTable apiClientList={apiClientList} /> :
          <Flex 
            alignItems='center'
            bg='gray.100'
            flexDir='column'
            justifyContent='center'
            padding='30px'
            w='full'
          >
            <Text 
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              No results found - Try adding a new item or adjust your filter to find what you’re looking for.
            </Text> 

            <Text
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              Not sure where to start? Visit our documentation site to learn more.
            </Text>
          </Flex>}
      </Flex>
    </Flex>
  )
}

export default APIClientsTab