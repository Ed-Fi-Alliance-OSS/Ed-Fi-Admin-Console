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