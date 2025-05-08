// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex,
  Link,
  Text
} from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import DataHealthDetails from './DataHealthDetails'
import OnBoardingTabContentWrapper from './OnBoardingTabContentWrapper'

interface ReviewDataTabContentProps {
  setupWizard?: boolean
}

const ReviewDataTabContent = ({ setupWizard }: ReviewDataTabContentProps) => {
  const adminConfig = useContext(adminConsoleContext)

  return (
    <OnBoardingTabContentWrapper>
      {adminConfig && adminConfig.showDataHealth ? <>
        <Text
          fontFamily='Poppins'
          fontWeight='400'
          w='730px'
        >
          Use the data preview to see whether the number of records submitted by your SIS landed in the ODS {setupWizard ? 'for this school year' : ''}. The preview displays the total counts for each resource identified. Green tiles indicate that data exists and gray tiles indicate that data does not exist for that particular resource. If something here looks incorrect, you’ll need to troubleshoot within your SIS or access support resources.
        </Text>

        <Flex
          mt='32px'
          w='full'
        >
          <DataHealthDetails
            isReview={false}
            showReload={true}
          />
        </Flex>
      </> : <Text
        fontFamily='Poppins'
        fontSize='24px'
        fontWeight='600'
        w='730px'
      >
        Coming Soon
      </Text>
      }
      <Flex
        justifyContent='space-between'
        mt='32px'
        w='full'
      >
        {false && <Link
          color='blue.500'
          fontFamily='Poppins'
          fontWeight='700'
          size='md'
        >
          Not seeing what you were expecting? Get help here.
        </Link>}
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default ReviewDataTabContent