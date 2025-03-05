// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { Tenant } from '../../../core/Tenant.types'
import AccordionItemSkeleton from '../AccordionItemSkeleton'
import DistrictSchoolsAccordion from './DistrictSchoolsAccordion'

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
      w='full'
    >
      { districtList.length > 0 && districtList.map((district, index) => 
        <DistrictSchoolsAccordion 
          key={index}
          district={district}
          isRemovingDomain={isRemovingDomain}
          onRemoveDomain={onRemoveDomain}
          onShowAddDomainForm={onShowAddDomainForm}
        />)}

      <AccordionItemSkeleton itemsCount={districtList.length} />
    </Flex>
  )
}

export default DistrictSchoolsTableRows