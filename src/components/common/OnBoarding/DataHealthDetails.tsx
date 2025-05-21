// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import useDataHealthInfo from '../../../hooks/dataHealth/useDataHealthInfo'
import useDataHealthDateInfo from '../../../hooks/useDataHealthDateInfo'
import CommonTooltip from '../CommonTooltip'
import DataHealthFetchErrorMessage from '../Instance/DataHealthFetchErrorMessage'
import RefreshBtn from '../RefreshBtn'
import DataHealthDataGrid from './DataHealthDataGrid'

interface DataHealthDetailsProps {
    showReload: boolean
    isReview: boolean 
}

const DataHealthDetails = ({ showReload, isReview }: DataHealthDetailsProps) => {
  const { dataHealthInfo, refreshDataHealthInfo, dataHealthFetchError } = useDataHealthInfo({
    instance: null, 
    usingSchoolYear: false
  })

  const { dataHealthDate, onUpdateDataHealthDate } = useDataHealthDateInfo()

  const onRefreshDataHealthInfo = async () => {
    await refreshDataHealthInfo()
    onUpdateDataHealthDate()
  }

  return (
    <Flex
      alignItems='center'
      w='full'
    >
      <Flex
        flexDir='column'
        h='full'
      >
        {!isReview && <Flex
          alignItems='center'
          w='180px'
        >
          <Text 
            fontFamily='Poppins'
            fontWeight='700'
            mr='10px'
            fontSize='md'
          >
            Data Preview
          </Text>

          <CommonTooltip
            bg="blue.600"
            iconColor="blue.600"
            label="Check that the data flowing in looks correct. If something looks off, check it out in Data Health Check"
            size='12px'
          />
        </Flex>}

        <Flex
          flexDir='column'
          w='full'
        >
          <Flex
            alignItems='center'
            mb='12px'
            w='full'
          >
            <Text
              color='gray.500'
              fontFamily='Poppins'
              fontStyle='italic'
              fontWeight='400'
              mt='5px'
              fontSize='xs'
            >{dataHealthDate}
            </Text>

            {showReload && <RefreshBtn 
              fontSize="20px"
              id="data-health"
              onAction={onRefreshDataHealthInfo}
            />}
          </Flex>

          { dataHealthFetchError && <DataHealthFetchErrorMessage error={dataHealthFetchError} /> }
        </Flex>
      </Flex>

      <Flex>
        <Flex ml='50px'>
          { !dataHealthFetchError && <DataHealthDataGrid dataHealth={dataHealthInfo} />}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DataHealthDetails