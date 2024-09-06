import { useState, ChangeEvent } from 'react'
import { Flex } from "@chakra-ui/react"
import routes from "../../core/routes"
import BackToLink from "../common/BackToLink"
import AddInstanceForm from "../common/Instance/AddInstanceForm"
import TabContentWrapper from "../common/TabContentWrapper"
import TabHeading from "../common/TabHeading"

const AddInstancePage = () => {
    const [instanceName, setInstanceName] = useState("")
    const [instanceDescription, setInstanceDescription] = useState("")
    const [schoolYear, setSchoolYear] = useState("2023")
    const [schoolYearOptions, setSchoolYearOptions] = useState([
        '2023',
        '2024',
        '2025'
    ])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'instanceName')
            return setInstanceName(e.target.value)
        
            setInstanceDescription(e.target.value)
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSchoolYear(e.target.value)
    }

    const handleSaveChanges = () => {
        console.log('add instance!')
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