// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Table, Text
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
          <Table.Cell w='30%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              fontSize='sm'
            >
              {invitation.email}
            </Text>
          </Table.Cell>

          <Table.Cell w='20%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              fontSize='sm'
            >
              {invitation.firstName}
            </Text>
          </Table.Cell>

          <Table.Cell w='20%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              fontSize='sm'
            >
              {invitation.lastName}
            </Text>
          </Table.Cell>

          <Table.Cell w='20%'>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              fontSize='sm'
            >
              {invitation.role === 'Tenant.Admin'? 'District Admin' : 'District User'}
            </Text>
          </Table.Cell>

          <Table.Cell w='200px'>
            <InvitationStatus status={invitation.invitationStatus} />
          </Table.Cell>
        </ControlTableRow>)}
    </>
  )
}

export default InviteUsersTableRows