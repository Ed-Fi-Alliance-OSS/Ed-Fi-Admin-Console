// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useEffect, useState
} from 'react'
import { ODSInstance } from '../../core/ODSInstance.types'
import useHttpService from '../http/useHttpService'
import { EdFiMetadata } from '../useEdfiUrls.types'

interface UseOdsInstanceDescriptionProps {
    instance: ODSInstance | null
}

const useOdsInstanceDescription = ({ instance }: UseOdsInstanceDescriptionProps) => {
  const { getSimpleAsync } = useHttpService()
  const [ instanceOdsMetadata, setInstanceOdsMetadata ] = useState<EdFiMetadata | null>(null)
  const [ loadingInstanceOdsMetadata, setLoadingInstanceOdsMetadata ] = useState(false)

  const getInstanceEdFiMetadata = async () => {
    if (!instance) {
      return
    } 

    // if (!instance.edfiMetadata) {
    //   return
    // } 

    // setInstanceOdsMetadata(instance.edfiMetadata)
  }

  useEffect(() => {
    if (!instance) {
      return
    } 

    getInstanceEdFiMetadata()
  }, [ instance ])

  return {
    instanceOdsMetadata,
    loadingInstanceOdsMetadata
  }
}

export default useOdsInstanceDescription