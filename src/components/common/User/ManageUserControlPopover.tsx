import { ChevronDownIcon } from "@chakra-ui/icons"
import { Popover, PopoverTrigger, Button, PopoverContent, PopoverBody, Flex } from "@chakra-ui/react"
import { useContext } from "react"
import { adminConsoleContext } from "../../../context/adminConsoleContext"
import { AppUser, AppUserSource, AppUserStatus } from "../../../core/AppUser.types"
import { InvitationStatus } from "../../../core/invitations/Invitation.types"
import { UsersTableMode } from "../../../hooks/adminActions/users/useManageUsersTable"

interface ManageUserControlPopoverProps {
    userId: string
    source: AppUserSource | null
    user: AppUser
    status: AppUserStatus | InvitationStatus
    mode: UsersTableMode
    isDeleting: boolean
    isDeletingInvitation: boolean 
    onDeleteInvitation: (invitationId: string) => void
    onDelete: (userId: string) => void
    onActivate: (userId: string) => void
    onDeactivate: (userId: string) => void
    onEditInvitation: (user: AppUser) => void
}

const ManageUserControlPopover = ({ userId, user, source, mode, status, isDeleting, isDeletingInvitation, onDeleteInvitation, onActivate, onEditInvitation, onDeactivate, onDelete }: ManageUserControlPopoverProps) => {
    const adminConfig = useContext(adminConsoleContext)

    const showDeleteBtn = () => {
        if ((adminConfig && adminConfig.showUserDelete) || mode === 'invitations')
            return true

        return false
    }

    const showEditInvitationBtn = () => {
        if (mode === 'invitations')
            return true 

        return false
    }

    const selectBorderRadius = () => {
        if (mode === 'invitations') {
            if (status === 'Inactive')
                return '0px 4px 4px 0px'

            return '4px'
        }

        return '0px 4px 4px 0px'
    }

    const isDisabled = (source: AppUserSource | null) => {
        if (source === 'Manual' || source === null)
            return false

        return true
    }

    return (
        <Popover>
        <PopoverTrigger>
            <Button 
                onClick={() => console.log("manage user control popover")}
                size='xs'
                borderRadius={selectBorderRadius()}
                variant='primaryBlue600'
                ml='1px'
                minW='24px'
                maxW='24px'
                aria-labelledby={`show-options-${userId}`}>
                    <span id={`show-options-${userId}`} hidden>Show Options</span>
                    <ChevronDownIcon 
                        fontSize='18px'    
                        aria-hidden="true" 
                        focusable="false"  />
            </Button>
        </PopoverTrigger>
        <PopoverContent 
            top='0px'
            padding='0'
            w='auto'
            aria-label={`options-${userId}`}
            >
                <PopoverBody padding='10px'>
                    <Flex flexDir='column' w='auto'>
                        {status === 'Active' && mode === 'users' && <Button
                            onClick={() => onDeactivate(userId)}
                            display='flex'
                            fontWeight='400'
                            fontFamily='Open sans'
                            color='black'
                            minW='auto'
                            justifyContent='start'
                            textAlign='start'
                            padding='0'>
                                Mark as Inactive
                        </Button>}
                        {status === 'Inactive' && mode === 'users' && <Button 
                            onClick={() => onActivate(userId)}
                            display='flex'
                            fontWeight='400'
                            fontFamily='Open sans'
                            justifyContent='start'
                            color='black'
                            textAlign='start'
                            padding='0'> 
                                Mark as Active
                        </Button>}
                        {showEditInvitationBtn() && <Button
                            onClick={() => onEditInvitation(user)}
                            display='flex'
                            fontWeight='400'
                            fontFamily='Open sans'
                            color="gray.600"
                            size='xs'
                            justifyContent='start'
                            textAlign='start'
                            minW='30px'
                            padding='0'
                            w='auto'
                            isDisabled={isDisabled(user.source)}
                            _disabled={{ opacity: 0.4 }}>
                                Edit
                        </Button>}
                        {showDeleteBtn() && <Button
                            onClick={() => mode === 'users' ? onDelete(userId) : onDeleteInvitation(userId)}
                            isDisabled={isDisabled(source)}
                            display='flex'
                            fontWeight='400'
                            fontFamily='Open sans'
                            color="red.600"
                            size='xs'
                            isLoading={mode === "users"? isDeleting : isDeletingInvitation}
                            justifyContent='start'
                            textAlign='start'
                            minW='30px'
                            padding='0'
                            w='auto'
                            _disabled={{ opacity: 0.4 }}>
                                Delete
                        </Button>}
                    </Flex>
                </PopoverBody>
        </PopoverContent>
    </Popover>
    )
}

export default ManageUserControlPopover