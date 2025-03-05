// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useContext } from 'react'
import {
  TEEAuthDataContext, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import Page from './Page'

interface PageWrapperProps {
    pageName: string 
    children: JSX.Element
}

const PageWrapper = ({ children,  pageName }: PageWrapperProps) => {
  const { edxAppConfig } = useContext(TEEAuthDataContext)
  const { userProfile } = useContext(UserProfileContext)

  return (
    <Page 
      appName={edxAppConfig? edxAppConfig.app.subtitle as string : ''}
      title={userProfile? pageName : `Loading ${pageName}...`}
    >
      {children}
    </Page>
  )
}

export default PageWrapper