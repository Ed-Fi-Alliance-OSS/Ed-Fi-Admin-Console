// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import ConsolePageContent from './ConsolePageContent'
import PageWrapper from './PageWrapper'

const ConsolePage = () => {
  return (
    <PageWrapper pageName='Admin Actions'>
      <ConsolePageContent />
    </PageWrapper>
  )
}

export default ConsolePage