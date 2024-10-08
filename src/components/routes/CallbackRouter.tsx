import { Navigate } from "react-router-dom"
import { useAuth, useInitialRoute } from "@edfi/admin-console-shared-sdk"
import routes from "../../core/routes"

const CallbackRouter = () => {
    const auth = useAuth()
    const { getInitialPath } = useInitialRoute()

    const selectRedirect = () => getInitialPath() ?? routes.home.url
    
    if (auth.isAuthenticated) 
        return <Navigate to={selectRedirect()} replace={true} />

    return null
}

export default CallbackRouter