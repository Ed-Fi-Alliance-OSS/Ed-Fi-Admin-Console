import routes from '../../core/routes'
import BackToLink from './BackToLink'

const AdminConsoleHeader = () => {
  return (
    <>
      <BackToLink
        text="Back to Tech Console Home" 
        url={routes.home.url}
      />

    </>
  )
}

export default AdminConsoleHeader