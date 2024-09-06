import { ChangeEvent } from 'react'
import { VerifyDomain } from "../../../core/verifyDomain/VerifyDomain.types"
import ControlTable from "../ControlTable"
import VerifyDomainTableHeader from "./VerifyDomainTableHeader"
import VerifyDomainTableRows from "./VerifyDomainTableRows"

const headers = [
    <VerifyDomainTableHeader 
        headerName="Type"
        tooltipMessage="When adding this record to your DNS, select “TXT” as your record type." />,
    <VerifyDomainTableHeader 
        headerName="Name"
        tooltipMessage="Add this value to the 'Name' field in your new DNS record." />,
    <VerifyDomainTableHeader 
        headerName="Value"
        tooltipMessage="Copy this value and add it as a record in your DNS. Then come back and refresh the Domain to see if it has been confirmed." />,
    <VerifyDomainTableHeader 
        headerName="TTL"
        tooltipMessage="Set the TTL (Time to Live) value within your DNS record. This dictates the amount of time it takes changes to the DNS record to appear." />,
]

const verifyDomainList: VerifyDomain[] = [
    { 
        type: 'TXT',
        name: "@",
        value: "v=",
        ttl: "1 Hour"
    }
]

const VerifyDomainTable = () => {
    const handleCheckItem = (e: ChangeEvent<HTMLInputElement>) => {}

    return (
        <ControlTable
            headers={headers}
            rows={<VerifyDomainTableRows 
                verifyDomainList={verifyDomainList}
                onCheck={handleCheckItem} />}
            itemsCount={verifyDomainList.length}
            loading={false}
            thPadding='auto' />
    )
}

export default VerifyDomainTable