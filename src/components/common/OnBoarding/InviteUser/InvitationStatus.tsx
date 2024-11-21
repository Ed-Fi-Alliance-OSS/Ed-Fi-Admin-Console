import {
  Flex, Text 
} from '@chakra-ui/react'
import { InvitationStatus as IStatus } from '../../../../core/invitations/Invitation.types'

interface InvitationStatusProps {
    status: IStatus
}

const selectBorderColor = (status: IStatus) => {
  if (status === 'Accepted') {
    return 'green.400'
  }

  if (status === 'Sent') {
    return 'orange.400'
  }

  return 'gray.300'
}

const selectTextColor = (status: IStatus) => {
  if (status === 'Accepted') {
    return 'green.800'
  }

  if (status === 'Sent') {
    return 'orange.800'
  }

  return 'gray.300'
}

const selectStatusText = (status: IStatus) => {
  if (status === 'Accepted') {
    return 'Active'
  }

  if (status === 'Sent') {
    return 'Invited'
  }

  return 'Unknown'
}

const InvitationStatus = ({ status }: InvitationStatusProps) => {
  return (
    <Flex 
      alignItems='center'
      border='1px'
      borderColor={selectBorderColor(status)}
      borderRadius='4px'
      h='32px'
      justifyContent='center'
      w='64px'
    >
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        size='md'
      >
        {selectStatusText(status)}
      </Text>
    </Flex>
  )
}

export default InvitationStatus