// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { BasePluginComponent } from '../../BasePluginComponent'

export const FooterLeftComponent = (props: typeof BasePluginComponent['FooterLeft']) => {
  return <div>Showing Component from Footer Left: MarginTop = {props.marginTop}, MarginBottom: {props.marginBottom}</div>
}
