// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Helmet } from 'react-helmet-async'

interface PageProps {
    appName: string
    title: string
    htmlTags?: JSX.Element[]
    children: JSX.Element
}

const Page = ({ appName, title, children, htmlTags }: PageProps) => {
  return (
    <>
      <Helmet>
        <title>{ `${appName} | ${ title }` }</title>

        {htmlTags}
      </Helmet>

      { children }
    </>
  )
}

export default Page