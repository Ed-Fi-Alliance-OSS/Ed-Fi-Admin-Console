// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Link, Text
} from '@chakra-ui/react'
import {
  EdFiConnectionFormMode, EdFiConnectionVerificationStatus as VerificationStatus
} from '../../../hooks/edfi/useEdFiConnectionForm.types'
import EdFiConnectionVerificationError from './EdFiConnectionVerificationError'
import EdFiConnectionVerificationStatus from './EdFiConnectionVerificationStatus'

interface EdFiConnectionVerificationProps {
    mode: EdFiConnectionFormMode
    inOnboarding: boolean
    status: VerificationStatus 
}

const EdFiConnectionVerification = ({ mode, inOnboarding, status }: EdFiConnectionVerificationProps) => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Text
        fontSize='18px'
        fontWeight='700'
        id="connectionVerificationStatus"
      >Verification Status
      </Text>

      <Flex mt='12px'>
        { inOnboarding && <Text>
          The following status must be “Connected” to continue. 
          If you’ve submitted the credentials above and the status shows an error, 
          use the error message to troubleshoot or 
          <Link 
            color='blue.500'
            fontFamily='Poppins'
            href="https://txedexchange.atlassian.net/servicedesk/customer/portals" 
            ml='4px'
            target="_blank"
          >contact support.
          </Link>
        </Text> }

        { !inOnboarding && <Text>
          After inputting the credentials above, click “Verify Connection” to see if the connection worked.
          If the status does not change to “Connected” use the error message to troubleshoot or 
          <Link 
            color='blue.500'
            fontFamily='Poppins'
            href="https://txedexchange.atlassian.net/servicedesk/customer/portals"
            mx='4px'
            target="_blank"
          >contact support.
          </Link>
          Once connection is successful, click “Save” to return. 
        </Text> }
      </Flex>

      <Flex mt='16px'>
        <EdFiConnectionVerificationStatus status={status} />
      </Flex>

      <Flex mt='12px'>
        <EdFiConnectionVerificationError status={status} />   
      </Flex>
    </Flex>

  )
}

export default EdFiConnectionVerification