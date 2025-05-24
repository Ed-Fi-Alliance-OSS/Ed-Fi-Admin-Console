// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Link, Text
} from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Invitation } from '../../../core/invitations/Invitation.types'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import { SISProviderInfo } from '../../../core/sisProviders/SISProviders.types'
import { VerifiedDomainInfo } from '../../../core/verifyDomain/VerifyDomain.types'
import {
  EdFiConnectionFormData, EdFiConnectionVerificationStatus
} from '../../../hooks/edfi/useEdFiConnectionForm.types'
import useExternalODSData from '../../../hooks/useExternalODSData'
import ConnectedEdFiTable from './ConnectEdFi/ConnectedEdFiTable'
import ConnectedSISProvidersTable from './ConnectedSISProvidersTable'
import DataHealthDetails from './DataHealthDetails'
import FinalizeTabBlurb from './FinalizeTabBlurb'
import InviteUsersTable from './InviteUser/InviteUsersTable'
import OnBoardingTabContentWrapper from './OnBoardingTabContentWrapper'
import SelectedInstancesTable from './SelectedInstancesTable'
import SelectSSOMethodTable from './SelectSSOMethodTable'
import TrainingModuleList from './Training/TrainingModuleList'
import VerifiedDomainInfoTable from './VerifiedDomainInfoTable'


interface FinalizeTabContentProps {
  connectedSISProvidersList: SISProviderInfo[]
  verifiedDomainList: VerifiedDomainInfo[]
  invitationsList: Invitation[]
  connectedODS: EdFiConnectionFormData
  verificationStatus: EdFiConnectionVerificationStatus
  selectedInstance: ExtendedODSInstance | null
  onSelectInstance: (instance: ExtendedODSInstance) => void
}

const FinalizeTabContent = ({ connectedSISProvidersList, verifiedDomainList, connectedODS, verificationStatus, invitationsList, selectedInstance, onSelectInstance }: FinalizeTabContentProps) => {
  console.log('Verified domain list', verifiedDomainList)
  const adminConfig = useContext(adminConsoleContext)
  const { externalODS } = useExternalODSData()

  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        w='730px'
      >
        You’re almost ready to complete the onboarding process! Review the information below and make sure everything is correct. If not, go back and edit or
        <Link
          aria-label="contact support"
          color='blue.500'
          ml='2px'
          referrerPolicy='no-referrer'
          target='_blank'
          asChild
        >
          <RouterLink href="https://txedexchange.atlassian.net/servicedesk/customer/portals">
          contact support
          </RouterLink>
        </Link>. Once everything is looking good, click the “Finalize” button and your Tech Console will be ready to use!
      </Text>

      <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Flex alignItems='baseline'>
          <Text
            color='blue.500'
            fontFamily='Poppins'
            fontSize='20px'
            fontWeight='700'
          >
            Admin Users
          </Text>

          <Text
            color='blue.500'
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='400'
            ml='16px'
          >
            Remember: you’ll add other, non-admin users later.
          </Text>
        </Flex>

        <Flex
          mt='16px'
          w='full'
        >
          <InviteUsersTable
            invitationsList={invitationsList}
            isLoading={false}
          />
        </Flex>
      </Flex>

      <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontSize='20px'
          fontWeight='700'
        >
          Training
        </Text>

        <Flex
          mt='16px'
          w='full'
        >
          <TrainingModuleList trainingCompleted={true} />
        </Flex>
      </Flex>

      <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontSize='20px'
          fontWeight='700'
        >
          Verified Domain
        </Text>

        <Flex
          mt='16px'
          w='full'
        >
          <VerifiedDomainInfoTable verifiedDomainsList={verifiedDomainList} />
        </Flex>
      </Flex>

      {!externalODS.isExternalODS ? <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontSize='20px'
          fontWeight='700'
        >
          Selected Instance(s)
        </Text>

        <Flex
          mt='16px'
          w='full'
        >
          <SelectedInstancesTable
            selectedInstance={selectedInstance}
            settingAsDefault={false}
            showConfirmInstanceModal={false}
            tableMode="Show Selected"
            onClose={() => null}
            onContinue={() => null}
            onSelectInstance={onSelectInstance}
            onUpdateInstancesCount={() => null}
          />
        </Flex>
      </Flex> : <></>}

      <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontSize='20px'
          fontWeight='700'
        >
          Connected {`${externalODS.isExternalODS ? 'ODS' : 'Source Provider(s)'}`}
        </Text>

        <Flex
          mt='16px'
          w='full'
        >
          {externalODS.isExternalODS ? <ConnectedEdFiTable
            connectedODS={connectedODS}
            verificationStatus={verificationStatus}
          /> : <ConnectedSISProvidersTable connectedSISProvidersList={connectedSISProvidersList} />}
        </Flex>
      </Flex>

      <Flex
        alignItems='baseline'
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Text
          color='blue.500'
          fontFamily='Poppins'
          fontSize='20px'
          fontWeight='700'
        >
          Data Preview
        </Text>

        <Flex
          mt='16px'
          w='full'
        >
          {adminConfig && adminConfig.showDataHealth ?
            <DataHealthDetails
              isReview={true}
              showReload={true}
            /> : <Text
              fontFamily='Poppins'
              fontSize='24px'
              fontWeight='600'
              w='730px'
            >
              Coming Soon
            </Text>}
        </Flex>
      </Flex>

      <Flex
        flexDir='column'
        mt='42px'
        w='full'
      >
        <Flex alignItems='baseline'>
          <Text
            color='blue.500'
            fontFamily='Poppins'
            fontSize='20px'
            fontWeight='700'
          >
            Selected SSO Methods
          </Text>

          <Text
            color='blue.500'
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='400'
            ml='16px'
          >
            You can update these in the Tech Consolelater as well.
          </Text>
        </Flex>

        <Flex
          mt='16px'
          w='full'
        >
          <SelectSSOMethodTable showSelect={false} />
        </Flex>

        <Flex mt='16px'>
          <FinalizeTabBlurb />
        </Flex>
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default FinalizeTabContent