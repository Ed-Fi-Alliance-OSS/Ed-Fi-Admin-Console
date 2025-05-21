// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { AppUserLicense } from '../../../core/AppUser.types'

interface AppUserLicensesProps {
    licenses: AppUserLicense[]
}

const licensesText = (licenses: AppUserLicense[]) => {
  return licenses.join(',')
}

const AppUserLicenses = ({ licenses }: AppUserLicensesProps) => {
  return (
    <Flex>
      <Text
        fontFamily='Poppins'
        fontWeight='400'
        fontSize='md'
        w='auto'
        whiteSpace='initial'
      >
        {licensesText(licenses)}
      </Text>
    </Flex>
  )
}

export default AppUserLicenses