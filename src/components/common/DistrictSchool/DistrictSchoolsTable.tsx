// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { Tenant } from '../../../core/Tenant.types'
import DistrictSchoolsTableHeader from './DistrictSchoolsTableHeader'
import DistrictSchoolsTableRows from './DistrictSchoolsTableRows'

interface DistrictSchoolsTableProps {
    districtsList: Tenant[]
    isRemovingDomain: boolean 
    onShowAddDomainForm: () => void
    onRemoveDomain: (domainName: string) => void
}

const DistrictSchoolsTable = ({ districtsList, isRemovingDomain, onRemoveDomain, onShowAddDomainForm }: DistrictSchoolsTableProps) => {
  return (
    <Flex 
      flexDir='column'
      w='full'
    >
      <DistrictSchoolsTableHeader />

      <DistrictSchoolsTableRows
        districtList={districtsList}
        isRemovingDomain={isRemovingDomain}
        onRemoveDomain={onRemoveDomain}
        onShowAddDomainForm={onShowAddDomainForm}
      />
    </Flex>
  )
}

export default DistrictSchoolsTable