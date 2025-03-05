// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Td, Text
} from '@chakra-ui/react'
import { Invitation } from '../../../../core/invitations/Invitation.types'
import ControlTableRow from '../../ControlTableRow'
import InvitationStatus from './InvitationStatus'

interface InviteUsersTableRowsProps {
    invitationsList: Invitation[]
}

const InviteUsersTableRows = ({ invitationsList }: InviteUsersTableRowsProps) => {
  return (
    <>
      {invitationsList.map((invitation, index) => 
        <ControlTableRow key={index}>
          <Td w='30%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='sm'
            >
              {invitation.email}
            </Text>
          </Td>

          <Td w='20%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='sm'
            >
              {invitation.firstName}
            </Text>
          </Td>

          <Td w='20%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='sm'
            >
              {invitation.lastName}
            </Text>
          </Td>

          <Td w='20%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='sm'
            >
              {invitation.role === 'Tenant.Admin'? 'District Admin' : 'District User'}
            </Text>
          </Td>

          <Td w='200px'>
            <InvitationStatus status={invitation.invitationStatus} />
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default InviteUsersTableRows