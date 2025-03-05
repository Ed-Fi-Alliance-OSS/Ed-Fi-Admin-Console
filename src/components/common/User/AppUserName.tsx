// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Button } from '@chakra-ui/react'
import { AppUser } from '../../../core/AppUser.types'

interface AppUserNameProps {
    name: string 
    userId: string
    user: AppUser
    onClick: (userId: string) => void 
    onClickInvitation: (user: AppUser) => void
}

const AppUserName = ({ name, userId, user, onClick, onClickInvitation }: AppUserNameProps) => {
  const onBtnClick = () => {
    return onClick(userId)
  }

  return (
    <Button
      color='blue.600'
      cursor='pointer'
      fontFamily='Poppins'
      fontWeight='700'
      minW='auto'
      size='md'
      onClick={onBtnClick}
    >
      {name}
    </Button>
  )
}

export default AppUserName