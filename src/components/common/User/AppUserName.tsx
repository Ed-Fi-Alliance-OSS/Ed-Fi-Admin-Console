import { Button } from '@chakra-ui/react'
import { AppUser } from '../../../core/AppUser.types'
import { UsersTableMode } from '../../../hooks/adminActions/users/useManageUsersTable'

interface AppUserNameProps {
    mode: UsersTableMode
    name: string 
    userId: string
    user: AppUser
    onClick: (userId: string) => void 
    onClickInvitation: (user: AppUser) => void
}

const AppUserName = ({ name, userId, user, mode, onClick, onClickInvitation }: AppUserNameProps) => {
  const onBtnClick = () => {
    if (mode == 'users')
      return onClick(userId)

    onClickInvitation(user)
  }

  return (
    <Button
      onClick={onBtnClick}
      cursor='pointer'
      color='blue.600'
      fontFamily='Open sans'
      fontWeight='700'
      size='md'
      minW='auto'>
      {name}
    </Button>
  )
}

export default AppUserName