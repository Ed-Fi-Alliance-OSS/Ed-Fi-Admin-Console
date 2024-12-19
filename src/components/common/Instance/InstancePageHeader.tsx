import { Flex } from '@chakra-ui/react'
import routes from '../../../core/routes'
import BackToLink from '../BackToLink'

const InstancePageHeader = () => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <BackToLink 
        text="Back to Tech Console Home"
        url={routes.home.url}
      />
    </Flex>
  )
}

export default InstancePageHeader