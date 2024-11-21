import {
  Flex, Text 
} from '@chakra-ui/react'
import CommonTooltip from '../CommonTooltip'

interface VerifyDomainTableProps {
    headerName: string 
    tooltipMessage: string 
}

const VerifyDomainTableHeader = ({ headerName, tooltipMessage }: VerifyDomainTableProps) => {
  return (
    <Flex alignItems='center'>
      <Text
        fontFamily='Open sans'
        mr='5px'
      >{ headerName }
      </Text>

      <CommonTooltip
        bg="blue.600"
        iconColor="black"
        label={tooltipMessage}
        size='14px'
      />
    </Flex>
  )
}

export default VerifyDomainTableHeader