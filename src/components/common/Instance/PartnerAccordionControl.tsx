// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdExpandMore } from 'react-icons/md'
import {
  Button, Flex 
} from '@chakra-ui/react'

interface PartnerAccordionControlProps {
    onEditPartner: () => void
}

const PartnerAccordionControl = ({ onEditPartner }: PartnerAccordionControlProps) => {
  return (
    <Flex w='80px'>
      <Button 
        borderRadius='4px 0px 0px 4px'
        minW='39px'
        size='xs'
        variant='primaryBlue600'
        onClick={onEditPartner}
      >
        Edit
      </Button>

      <Button 
        aria-labelledby="show-options-btn"
        borderRadius='0px 4px 4px 0px'
        minW='24px'
        ml='1px'
        size='xs'
        variant='primaryBlue600'
      >
        <span
          hidden
          id="show-options-btn"
        >Show Options
        </span>

        <MdExpandMore
          aria-hidden="true"
          focusable="false"
          fontSize='18px'
        />
      </Button>
    </Flex>
  )
}

export default PartnerAccordionControl