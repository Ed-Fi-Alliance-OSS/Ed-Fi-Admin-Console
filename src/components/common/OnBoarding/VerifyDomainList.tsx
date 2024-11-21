import { Flex } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { DomainData } from '../../../hooks/adminActions/dns/useVerifyDomain'
import DomainTag from '../DomainTag'
import RefreshBtn from '../RefreshBtn'
import DomainVerificationStatus from './DomainVerificationStatus'

interface VerifyDomainListProps {
    domainsList: DomainData[],
    isRemovingDomain: boolean
    isCheckingDomainStatus: boolean 
    selectedDomain: string | null
    showDomainStatus: boolean 
    showCheck: boolean 
    onSelectDomain: (e: ChangeEvent<HTMLInputElement>) => void
    onRemoveDomain: (domainName: string) => void
    onVerifyDomain: (domainData: DomainData) => Promise<void>,
}

const VerifyDomainList = ({ domainsList, isCheckingDomainStatus, isRemovingDomain, showCheck, showDomainStatus, onSelectDomain, onRemoveDomain, onVerifyDomain }: VerifyDomainListProps) => {
  return (
    <Flex flexDir='column'>
      {domainsList.map((domain, index) => 
        <Flex
          key={index}
          _notFirst={{ mt: '5px' }}
        >
          <DomainTag domain={domain.name} />

          {showDomainStatus && <>
            <Flex ml='10px'>
              <DomainVerificationStatus 
                domainName={domain.name}
                isRemovingDomain={isRemovingDomain}
                showDeleteOption={true}
                status={domain.state} 
                onRemoveDomain={onRemoveDomain}
              />
            </Flex>

            <RefreshBtn
              id={domain.name}
              isRefreshing={isCheckingDomainStatus}
              onAction={() => onVerifyDomain(domain)}
            />
          </>}
        </Flex>)}
    </Flex>
  )
}

export default VerifyDomainList