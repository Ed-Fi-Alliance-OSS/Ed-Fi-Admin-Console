import { Heading } from "@chakra-ui/react"
import routes from "../../core/routes"
import BackToLink from "./BackToLink"

const AdminConsoleHeader = () => {
    return (
        <>
            <BackToLink
                text="Back to Tech Console Home" 
                url={routes.home.url} />
            <Heading 
                size='lg'
                mt='5px'>Admin Actions</Heading>
        </>
    )
}

export default AdminConsoleHeader