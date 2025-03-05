// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import useOdsInstanceIdParam from '../../hooks/odsInstances/useOdsInstanceIdParam'
import useOdsInstanceDisplayYear from '../../hooks/odsInstances/useOdsInstanceYearName'
import InstancePageContent from './InstancePageContent'
import PageWrapper from './PageWrapper'

const InstancePage = () => {
  const { getInstanceIdFromPath } = useOdsInstanceIdParam()
  const { getDisplayYear } = useOdsInstanceDisplayYear()

  return (
    <PageWrapper pageName={`Instance Id ${getInstanceIdFromPath()}`}>
      <InstancePageContent instanceId={getInstanceIdFromPath()} />
    </PageWrapper>
  )
}

export default InstancePage