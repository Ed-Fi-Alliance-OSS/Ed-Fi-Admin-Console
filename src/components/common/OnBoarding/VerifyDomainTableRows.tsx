import {
  Td, Text
} from '@chakra-ui/react'
import { CopyTextBtn, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import {
  ChangeEvent, useContext
} from 'react'
import { VerifyDomain } from '../../../core/verifyDomain/VerifyDomain.types'
import ControlTableRow from '../ControlTableRow'

interface VerifyDomainTableRowsProps {
    verifyDomainList: VerifyDomain[]
    onCheck: (e: ChangeEvent<HTMLInputElement>) => void
}

const VerifyDomainTableRows = ({ verifyDomainList, onCheck }: VerifyDomainTableRowsProps) => {
  const { userProfile } = useContext(UserProfileContext)

  return (
    <>
      {verifyDomainList.map((verifyDomain, index) => 
        <ControlTableRow key={index}>
          <Td display='flex'>
            <Text
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {verifyDomain.type}
            </Text>
          </Td>

          <Td>
            <Text
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {verifyDomain.name}
            </Text>
          </Td>

          <Td display='flex'>
            <Text
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
              w='380px'
            >
              {`${verifyDomain.value}${userProfile? userProfile.tenantId : ''}`}
            </Text>

            <CopyTextBtn
              value={userProfile? userProfile.tenantId : ''}
              withoutBorder={true}
            />
          </Td>

          <Td>
            <Text
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {verifyDomain.ttl}
            </Text>
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default VerifyDomainTableRows