import { useEffect, useState } from 'react'
import { Button, Flex, Text } from "@chakra-ui/react"
import InviteUserModal from "./InviteUserModal"
import InviteUsersTable from "./InviteUsersTable"
import OnBoardingTabContentWrapper from "../OnBoardingTabContentWrapper"
import useInvitationsList from '../../../../hooks/adminActions/users/useInvitationsList'

interface InviteUsersTabContentProps {
    onCompleteStep: (stepIndex: number) => void
}

const InviteUsersTabContent = ({ onCompleteStep }: InviteUsersTabContentProps) => {
    const { invitationsList, isFetchingInvitations, onRefresh } = useInvitationsList()
    const [ showInviteModal, setShowInviteModal ] = useState(false)

    const handleShowInviteModal = () => setShowInviteModal(true)
    const handleHideInviteModal = () => setShowInviteModal(false)

    const handleInvitationSent = async () => {
        if (invitationsList.length === 0) 
            onCompleteStep(0)
            
        handleHideInviteModal()
        await onRefresh()
    }

    useEffect(() => {
        if (invitationsList.length > 0)
            onCompleteStep(0)

    }, [ invitationsList ])

    return (
        <OnBoardingTabContentWrapper>
            <Text
                fontFamily='Open sans'
                textAlign='justify'
                fontWeight='400'
                w='730px'>
                    Use the information below to invite other users within your District/Charter School that need Admin Access. Once they complete the login process, they’ll be able to contribute to this setup process with you. Note: anyone you add here will have the highest level of Admin Access, so make sure they’re up to speed with your best practices for data management. You’ll be able to add users with other roles later. 
            </Text>
            <Flex justifyContent='flex-end' mt='32px' w='full'>
                <InviteUserModal
                    show={showInviteModal}
                    onAfterAction={handleInvitationSent}
                    onClose={handleHideInviteModal} />
                <Button
                    onClick={handleShowInviteModal}
                    variant='primaryBlue500'
                    size='xs'
                    minW='130px'>
                        Invite Technical Admin Users
                </Button>
            </Flex>
            <Flex mt='10px' w='full'>
                <InviteUsersTable invitationsList={invitationsList} isLoading={isFetchingInvitations} />
            </Flex> 
        </OnBoardingTabContentWrapper>
    )
}

export default InviteUsersTabContent