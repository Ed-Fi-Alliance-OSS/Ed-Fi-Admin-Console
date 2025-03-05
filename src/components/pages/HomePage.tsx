// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import HomePageContent from './HomePageContent'
import PageWrapper from './PageWrapper'

const HomePage = () => {
  return (
    <PageWrapper pageName='Home'>
      <HomePageContent />    
    </PageWrapper>
  )
}

export default HomePage