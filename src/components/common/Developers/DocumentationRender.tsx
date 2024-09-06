import { Flex } from "@chakra-ui/react"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { DocumentationOption } from "../../../hooks/useDevelopersDocumentations"

interface DocumentationRenderProps {
    documentationUrl: string | null
    selectedDocumentation: DocumentationOption
}

const DocumentationRender = ({ documentationUrl, selectedDocumentation }: DocumentationRenderProps) => {
    return (
        <>
            {selectedDocumentation !== 'Select Source' && documentationUrl && 
                <Flex 
                    className="special-flex"
                    __css={{ '&': { ml: '0px', width: 'full' } }}>
                    <SwaggerUI url={documentationUrl} />
                </Flex>}
        </>
    )
}

export default DocumentationRender