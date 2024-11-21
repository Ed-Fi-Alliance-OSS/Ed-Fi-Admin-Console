import { Heading } from '@chakra-ui/react'
import routes from '../../core/routes'
import BackToLink from './BackToLink'

const AdminConsoleHeader = () => {
  return (
    <>
      <BackToLink
        text="Back to Tech Console Home" 
        url={routes.home.url}
      />

      <Heading 
        mt='5px'
        size='lg'
      >Admin Actions
      </Heading>
    </>
  )
}

export default AdminConsoleHeader