// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import routes from '../../core/routes'

const initialUrlStorageField = 'EDX_ADMIN_INITIAL_URI'

const saveInitialPath = () => {
  if (!window.location.href.includes('callback')) {
    const pathName = window.location.pathname
    let destination = pathName.includes('/adminconsole')? pathName.replaceAll('/adminconsole', '') : pathName

    if (destination === '') {
      destination = routes.home.url
    }

    localStorage.setItem(initialUrlStorageField, destination)
  }
}

const getInitialPath = () => localStorage.getItem(initialUrlStorageField)

export {
  saveInitialPath,
  getInitialPath
}