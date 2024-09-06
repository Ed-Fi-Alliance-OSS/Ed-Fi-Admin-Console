import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import useDistrictSchoolsTable from "../../../hooks/adminActions/districtSchools/useDistrictSchoolsTable"
import TabHeading from "../TabHeading"
import AddDomainForm from "./AddDomainForm"
import DistrictSchoolsTable from "./DistrictSchoolsTable"

type DistrictTabContent = "Table" | "Add Domain Form"

const DistrictSchoolTabContent = () => {
    const { districtsList, isRemovingDomain, onRemoveDomain, onRefresh } = useDistrictSchoolsTable()
    const [districtTabContent, setDistrictTabContent] = useState<DistrictTabContent>("Table")

    const onShowTable = () => setDistrictTabContent("Table")
    const onShowAddDomainForm = () => setDistrictTabContent("Add Domain Form")

    const onAfterAddDomain = async () => {
        onShowTable()
        await onRefresh()
    }

    return (
        <Flex flexDir={districtTabContent === 'Table'? "column" : "row"} w='full'>
            <Flex w={districtTabContent === 'Table'? "full" : '350px'}>
                <TabHeading text={ districtTabContent === 'Table'? "District/Charter School Settings" : "Add Domain"} />
            </Flex>
            <Flex mt='16px' w='full'>
                { districtTabContent === "Table" && <DistrictSchoolsTable 
                    districtsList={districtsList}
                    isRemovingDomain={isRemovingDomain}
                    onShowAddDomainForm={onShowAddDomainForm}
                    onRemoveDomain={onRemoveDomain} /> }
                { districtTabContent === "Add Domain Form" && <AddDomainForm 
                    districtData={districtsList[0]} 
                    onAfterSave={onAfterAddDomain} /> }
            </Flex>
        </Flex>
    )
}

export default DistrictSchoolTabContent