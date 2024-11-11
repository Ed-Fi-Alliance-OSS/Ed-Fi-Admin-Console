import { Flex } from '@chakra-ui/react'
import useDevelopersDocumentation from '../../../hooks/useDevelopersDocumentations'
import TabHeading from '../TabHeading'
import APIDocumentationForm from './APIDocumentationForm'
import DocumentationRender from './DocumentationRender'

const DocumentationTabContent = () => {
  const {
    documentationOptions,
    documentationUrl,
    selectedDocumentation,
    handleSelectDocumentation
  } = useDevelopersDocumentation()

  return (
    <Flex flexDir='column' w='full'>
      <Flex>
        <Flex w='300px'>
          <TabHeading text="Documentation (Advanced)" />
        </Flex>
        <APIDocumentationForm
          selectedDocumentation={selectedDocumentation}
          documentationOptions={documentationOptions}
          onSelectDocumentation={handleSelectDocumentation} />
      </Flex>
      <Flex flexDir='column' w='full'>
        <Flex mt='32px' w='full'>
          <DocumentationRender 
            selectedDocumentation={selectedDocumentation}
            documentationUrl={documentationUrl} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DocumentationTabContent