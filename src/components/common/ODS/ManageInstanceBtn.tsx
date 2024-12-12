import {
  Button, Flex
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceLink from '../../../hooks/odsInstances/useOdsInstanceLink'

interface ManageInstanceBtnProps {
    instance: ODSInstance
}

const ManageInstanceBtn = ({ instance }: ManageInstanceBtnProps) => {
  const { getOdsInstanceLink } = useOdsInstanceLink()
  const navigate = useNavigate()

  return (
    <Flex w='80px'>
      <Button 
        minW='67px'
        size='xs'
        variant='primaryBlue600'
        onClick={() => navigate(getOdsInstanceLink(instance))}
      >
        Manage
      </Button>
    </Flex>
  )
}

export default ManageInstanceBtn