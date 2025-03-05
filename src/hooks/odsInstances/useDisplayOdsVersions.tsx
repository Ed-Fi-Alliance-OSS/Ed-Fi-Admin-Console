// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { EdFiMetadata } from '../useEdfiUrls.types'
import useOdsVersions from './useOdsVersions'

interface UseDisplayOdsVersionsProps {
    instanceOdsMetadata: EdFiMetadata | null
}

const useDisplayOdsVersions = ({ instanceOdsMetadata }: UseDisplayOdsVersionsProps) => {
  const {
    getEdFiVersionFromMetadata,
    getTSDSVersionFromMetadata
  } = useOdsVersions()

  const displayEdFiVersionContent = () => {
    return getEdFiVersionFromMetadata(instanceOdsMetadata)
  }

  const displayTsdsVersionContent = () => {
    return getTSDSVersionFromMetadata(instanceOdsMetadata)
    // return <Flex gridGap={2}>
    //   {instanceOdsMetadata?.dataModels?.map(dataModel => {
    //     return <>
    //       <Tag>{dataModel.name} ({dataModel.version})</Tag>
    //     </>
    //   })}
    // </Flex>
  }

  return {
    displayEdFiVersionContent,
    displayTsdsVersionContent
  }
}

export default useDisplayOdsVersions