import { TEEAuthDataContext, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { useState, useEffect, useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Invitation } from '../../../core/invitations/Invitation.types'
import useUsersService from '../../../services/AdminActions/Users/UsersService'
import { GetInvitationsListRequest } from '../../../services/AdminActions/Users/UsersService.requests'
import useEDXToast from '../../common/useEDXToast'

const useInvitationsList = () => {
  const { userProfile } = useContext(UserProfileContext)
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { getInvitationsList } = useUsersService()
  const [invitationsList, setInvitationsList] = useState<Invitation[]>([])
  const { successToast, errorToast } = useEDXToast()
  const [isFetchingInvitations, setIsFetchingInvitations] = useState(false)

  const fetchInvitationsList = async () => {
    if (auth && auth.user && userProfile && edxAppConfig && adminConfig) {
      setIsFetchingInvitations(true)
      const requestData: GetInvitationsListRequest = {
        pageIndex: 0,
        pageSize: 100,
        orderBy: 'firstName+asc',
        // filter: 'role+eq+Tenant.Admin'
      }

      const result = await getInvitationsList(adminConfig.actionParams, requestData)

      setIsFetchingInvitations(false)
      console.log('get invitations list result', result)

      if (result.type === 'Error')
        errorToast(result.actionMessage)
      else
        setInvitationsList(result.data.filter(invitation => invitation.role === 'Tenant.Admin'))
    }
  }

  const onRefresh = async () => await fetchInvitationsList()

  useEffect(() => {
    fetchInvitationsList()
  }, [])

  return {
    invitationsList,
    isFetchingInvitations,
    onRefresh
  }
}

export default useInvitationsList