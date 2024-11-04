import { Flex, Heading } from '@chakra-ui/react'
import routes from '../../../core/routes'
import BackToLink from '../BackToLink'

const StatusSummaryPageHeader = () => {
  return (
    <Flex flexDir='column' w='full'>
      <BackToLink 
        text="Back to Tech Console Home"
        url={routes.home.url} />
      <Heading
        size='lg'
        mt='5px'>
                    Instance Status Summary
      </Heading>
    </Flex>
  )
}

export default StatusSummaryPageHeader