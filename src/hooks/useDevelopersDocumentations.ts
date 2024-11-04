import { ChangeEvent, useEffect, useState } from 'react'

type DocumentationType = 'Tenant' | 'Admin'
export type DocumentationOption = DocumentationType | 'Select Source'

const documentationOptions: Array<DocumentationOption> = [
  'Select Source',
  'Tenant',
  'Admin'
]

const documentationBaseUrl = 'https://raw.githubusercontent.com/EdWire/public/main/swagger'
const documentationFolder = 'txedexchange.dev'
const documentationFiles = {
  tenant: 'tenants-v1-swagger.json',
  admin: 'edfiadmin-v1-swagger.json'
}

const useDevelopersDocumentation = () => {
  const [ documentationUrl, setDocumentationUrl ] = useState<string | null>(null)
  const [ selectedDocumentation, setSelectedDocumentation ] = useState<DocumentationOption>(documentationOptions[0])

  const handleSelectDocumentation = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== documentationOptions[0])
      setSelectedDocumentation(e.target.value as DocumentationOption)
  }

  const generateDocumentationUrl = (documentation: DocumentationType) => {
    const baseUrl = `${documentationBaseUrl}/${documentationFolder}`
    const resouceFile = documentationFiles[documentation.toLocaleLowerCase()]

    console.log('documentation url', `${baseUrl}/${resouceFile}`)

    return `${baseUrl}/${resouceFile}`
  }

  const changeDocumentationUrl = (documentation: DocumentationType) => {
    setDocumentationUrl(generateDocumentationUrl(documentation))
  }

  useEffect(() => {
    if (selectedDocumentation !== 'Select Source') {
      changeDocumentationUrl(selectedDocumentation as DocumentationType)
    }
  }, [ selectedDocumentation ])

  return {
    documentationOptions,
    documentationUrl,
    selectedDocumentation,
    handleSelectDocumentation
  }
}

export default useDevelopersDocumentation