// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MessageType } from '../../../core/UserSync/UserSync.types'

const useLogMessage = () => {
  const mapLogMessageType = (messageType: number): MessageType => {
    if (messageType === 0) {
      return 'Information'
    }
    
    if (messageType === 1) {
      return 'Warning'
    }
    
    if (messageType === 2) {
      return 'Sync Error'
    }
    
    return 'Fatal Error'
  }

  return { mapLogMessageType }
}

export default useLogMessage