// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import PageWrapper from './PageWrapper'
import SetUpWizardPageContent from './SetUpWizardPageContent'

const SetUpWizardPage = () => {
  return (
    <PageWrapper pageName="School Year Setup">
      <SetUpWizardPageContent />
    </PageWrapper>
  )
}

export default SetUpWizardPage