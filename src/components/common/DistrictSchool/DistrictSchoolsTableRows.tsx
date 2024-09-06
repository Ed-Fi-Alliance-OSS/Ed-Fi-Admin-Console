import { Flex } from "@chakra-ui/react"
import { Tenant } from "../../../core/Tenant.types"
import AccordionItemSkeleton from "../AccordionItemSkeleton"
import DistrictSchoolsAccordion from "./DistrictSchoolsAccordion"

interface DistrictSchoolsTableRowsProps {
    districtList: Tenant[]
    isRemovingDomain: boolean 
    onRemoveDomain: (domainName: string) => void
    onShowAddDomainForm: () => void
}

const DistrictSchoolsTableRows = ({ districtList, isRemovingDomain, onRemoveDomain, onShowAddDomainForm }: DistrictSchoolsTableRowsProps) => {
    return (
        <Flex 
            border='1px'
            borderColor='gray.300'
            w='full'>
                { districtList.length > 0 && districtList.map((district, index) => 
                    <DistrictSchoolsAccordion 
                        district={district}
                        isRemovingDomain={isRemovingDomain}
                        onRemoveDomain={onRemoveDomain}
                        onShowAddDomainForm={onShowAddDomainForm}
                        key={index} />
                )}
                <AccordionItemSkeleton itemsCount={districtList.length} />
        </Flex>
    )
}

export default DistrictSchoolsTableRows